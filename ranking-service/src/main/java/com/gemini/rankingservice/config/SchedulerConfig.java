package com.gemini.rankingservice.config;

import com.gemini.rankingservice.dto.GenerateEmotionDto;
import com.gemini.rankingservice.dto.ResponseGenerateEmotionDto;
import com.gemini.rankingservice.entity.*;
import com.gemini.rankingservice.repository.DailyRepository;
import com.gemini.rankingservice.repository.TagRepository;
import com.gemini.rankingservice.repository.WeeklyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobExecutionException;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
@Order(2)
public class SchedulerConfig {

    private final JobLauncher jobLauncher;

    private final RedisTemplate<String, Gallery> redisTemplate;

    private final DailyRepository dailyRepository;

    private final WeeklyRepository weeklyRepository;

    private final MongoTemplate mongoTemplate;

    private final RestTemplate restTemplate;

    private final TagRepository tagRepository;

    private final Environment env;

    private final List<String> emotions = Arrays.asList("(smile, bright face)", "angry face", "crying, sad face", "(blush,shameful face)");

    @Autowired
    @Qualifier("dailyJob_batchBuild")
    private Job dailyJob;

    @Autowired
    @Qualifier("weeklyJob_batchBuild")
    private Job weeklyJob;

//    @Scheduled(cron = "0 0 0 * * ?")
    public void runDailyJob() throws JobExecutionException {
        JobParameters jobParameters = new JobParametersBuilder()
                .addLong("time", System.currentTimeMillis())
                .toJobParameters();
        jobLauncher.run(dailyJob, jobParameters);
        addReward("daily");
    }
//    @Scheduled(cron = "0 */10 * * * *")
    //@Scheduled(cron = "0 0 0 ? * SUN")
    public void runWeeklyJob() throws JobExecutionException {
        JobParameters jobParameters = new JobParametersBuilder()
                .addLong("time", System.currentTimeMillis())
                .toJobParameters();
        jobLauncher.run(weeklyJob, jobParameters);
        addReward("weekly");
    }

    public void addReward(String check) {
        String key = "gallery:" + check + "_like";
        if (check.equals("daily")) {
            dailyRepository.deleteAll();
        }
        else {
            weeklyRepository.deleteAll();
        }
        long start = 0;
        long end = 4;
        RedisSerializer<Gallery> gallerySerializer = new Jackson2JsonRedisSerializer<>(Gallery.class);
        redisTemplate.setValueSerializer(gallerySerializer);
        Set<Gallery> galleries = redisTemplate.execute((RedisCallback<Set<Gallery>>) connection -> {
            Set<Gallery> periodSet = new LinkedHashSet<>();
            Set<byte[]> bytesSet = connection.zRange(key.getBytes(), start, end);
            for (byte[] bytes : bytesSet) {
                Gallery gallery = gallerySerializer.deserialize(bytes);
                periodSet.add(gallery);
            }
            return periodSet;
        });

        for (Gallery gallery : galleries) {

            Gemini gemini = gallery.getGemini();
            Long geminiNo = gemini.getGeminiNo();
            GeminiTag geminiTag = mongoTemplate.findOne(
                    Query.query(Criteria.where("geminiNo").is(gemini.getGeminiNo())),
                    GeminiTag.class
            );
            String defaultPrompt = "(illustration:1.3),(portrait:1.3),(best quality),(masterpiece),(high resolution),perfect anatomy,perfect finger,hyper detail,high quality, super detail,(finely detailed beautiful eyes and detailed face),ultra detailed cloths,";
            for(Long tagId: geminiTag.getTagIds()) {
                Tag tag = tagRepository.findByTagNo(tagId);
                if (tag.getCategoryNo().getCategoryNo() != 7) {
                    defaultPrompt = defaultPrompt + tag.getPrompt() + ",";
                }
            }

            List<String> prompts = new ArrayList<>();
            for (String emotion : emotions) {
                String prompt = defaultPrompt + emotion;
                prompts.add(prompt);
            }
//            GenerateEmotionDto generateEmotionDto = new GenerateEmotionDto(prompts, gemini.getSeed(), geminiNo, check);
            GenerateEmotionDto generateEmotionDto = new GenerateEmotionDto(prompts, gemini.getSeed(), gallery.getGalleryNo(), check);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            String sdUrl = String.format(env.getProperty("sd.url")) + "/emotion";
            HttpEntity<GenerateEmotionDto> request = new HttpEntity<>(generateEmotionDto, headers);
            ResponseEntity<ResponseGenerateEmotionDto> response = restTemplate.postForEntity(sdUrl, request, ResponseGenerateEmotionDto.class);
            ResponseGenerateEmotionDto res = response.getBody();
            if (check.equals("daily")) {
                Daily daily = new Daily(res.getGeminiNo(), res.getImageUrls());
                dailyRepository.save(daily);
            }
            else {
                Weekly weekly = new Weekly(res.getGeminiNo(), res.getImageUrls());
                weeklyRepository.save(weekly);
            }
        }


    }

}