package com.gemini.rankingservice.batch;

import com.gemini.rankingservice.entity.Gallery;
import com.gemini.rankingservice.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.JobBuilderFactory;
import org.springframework.batch.core.configuration.annotation.StepBuilderFactory;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.transaction.Transactional;

@RequiredArgsConstructor
@Configuration
public class WeeklyJob {

    private final JobBuilderFactory jobBuilderFactory;

    private final StepBuilderFactory stepBuilderFactory;

    private final EntityManagerFactory entityManagerFactory;

    private final EntityManager entityManager;

    private final RedisTemplate<String, Gallery> redisTemplate;

    private final GalleryRepository galleryRepository;

    public static final String WEEKLY_JOB = "WEEKLY_JOB";

    @Bean
    public Job weeklyJob_batchBuild() {

        Step step1 = weeklyJob_step1();
        Step step2 = weeklyJob_step2();
        Step step3 = weeklyJob_step3();

        return jobBuilderFactory.get("weeklyJob")
                .start(step1)
                .next(step2)
                .next(step3)
                .build();
    }

    @Bean
    public Step weeklyJob_step1() {

        return stepBuilderFactory.get("deleteWeekly")
                .tasklet((stepContribution, chunkContext) -> {
                    redisTemplate.delete("gallery:weekly_like");
                    return RepeatStatus.FINISHED;
                })
                .build();
    }

    @Bean
    public Step weeklyJob_step2() {

        int chunkSize = getTotalItemCount(entityManagerFactory, "SELECT COUNT(*) FROM Gallery");

        return stepBuilderFactory.get("writeWeekly")
                .<Gallery, Gallery>chunk(chunkSize)
                .reader(WeeklyItemReader())
                .writer(jpaPageJob2_redisWeeklyWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<Gallery> WeeklyItemReader() {
        int pageSize = 100; // 한 페이지당 읽어올 아이템 수
        return new JpaPagingItemReaderBuilder<Gallery>()
                .name("weeklyItemReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(pageSize)
                .queryString("SELECT g FROM Gallery g")
                .build();
    }


    @Bean
    public ItemWriter<Gallery> jpaPageJob2_redisWeeklyWriter() {

        return items -> {
            for (Gallery gallery : items) {
                redisTemplate.opsForZSet().add("gallery:weekly_like", gallery, gallery.getWeeklyLike());
            }
        };
    }

    @Bean
    public Step weeklyJob_step3() {

        int chunkSize = getTotalItemCount(entityManagerFactory, "SELECT COUNT(*) FROM Gallery");

        return stepBuilderFactory.get("updateWeeklyGallery")
                .<Gallery, Gallery>chunk(chunkSize)
                .reader(WeeklyItemReader())
                .writer(jpaPageJob3_dbWeeklyWriter())
                .build();
    }

    @Bean
    public ItemWriter<Gallery> jpaPageJob3_dbWeeklyWriter() {
        return galleries -> {
            for (Gallery gallery : galleries) {
                gallery.updateWeekly(0);
                galleryRepository.save(gallery);
            }
            entityManager.flush();
        };
    }

    private int getTotalItemCount(EntityManagerFactory entityManagerFactory, String query) {
        EntityManager entityManager = entityManagerFactory.createEntityManager();
        Query countQuery = entityManager.createQuery(query);
        return ((Number) countQuery.getSingleResult()).intValue();
    }
}
