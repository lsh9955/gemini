package com.gemini.rankingservice.batch;

import com.gemini.rankingservice.entity.Gallery;
import com.gemini.rankingservice.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.*;
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
public class DailyJob {

    private final JobBuilderFactory jobBuilderFactory;

    private final StepBuilderFactory stepBuilderFactory;

    private final EntityManagerFactory entityManagerFactory;

    private final EntityManager entityManager;

    private final RedisTemplate<String, Gallery> redisTemplate;

    private final GalleryRepository galleryRepository;

    public static final String DAILY_JOB = "dailyJob";

    @Bean
    public Job dailyJob_batchBuild() {

        Step step1 = dailyJob_step1();
        Step step2 = dailyJob_step2();
        Step step3 = dailyJob_step3();

        return jobBuilderFactory.get("dailyJob")
                .start(step1)
                .next(step2)
                .next(step3)
                .build();
    }

    @Bean
    public Step dailyJob_step1() {

        return stepBuilderFactory.get("deleteDaily")
                .tasklet((stepContribution, chunkContext) -> {
                    redisTemplate.delete("gallery:daily_like");
                    return RepeatStatus.FINISHED;
                })
                .build();
    }

    @Bean
    public Step dailyJob_step2() {
        int chunkSize = getTotalItemCount(entityManagerFactory, "SELECT COUNT(*) FROM Gallery");

        return stepBuilderFactory.get("writeDaily")
                .<Gallery, Gallery>chunk(chunkSize)
                .reader(DailyItemReader())
                .writer(jpaPageJob2_redisDailyWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<Gallery> DailyItemReader() {
        int pageSize = 100; // 한 페이지당 읽어올 아이템 수
        return new JpaPagingItemReaderBuilder<Gallery>()
                .name("dailyItemReader")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(pageSize)
                .queryString("SELECT g FROM Gallery g")
                .build();
    }

    @Bean
    public ItemWriter<Gallery> jpaPageJob2_redisDailyWriter() {

        return items -> {
            for (Gallery gallery : items) {
                redisTemplate.opsForZSet().add("gallery:daily_like", gallery, gallery.getDailyLike());
            }
        };
    }

    @Bean
    public Step dailyJob_step3() {

        int chunkSize = getTotalItemCount(entityManagerFactory, "SELECT COUNT(*) FROM Gallery");

        return stepBuilderFactory.get("updateDailyGallery")
                .<Gallery, Gallery>chunk(chunkSize)
                .reader(DailyItemReader())
                .writer(jpaPageJob3_dbDailyWriter())
                .build();
    }

    @Bean
    public ItemWriter<Gallery> jpaPageJob3_dbDailyWriter() {
        return galleries -> {
            for (Gallery gallery : galleries) {
                gallery.updateDaily(0);
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
