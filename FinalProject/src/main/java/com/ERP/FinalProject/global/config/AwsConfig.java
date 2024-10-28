package com.ERP.FinalProject.global.config;

import org.springframework.cloud.aws.messaging.core.NotificationMessagingTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.amazonaws.services.sns.AmazonSNS;
import com.amazonaws.services.sns.AmazonSNSClientBuilder;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.regions.Regions;

@Configuration
public class AwsConfig {

    @Bean
    public AmazonSNS amazonSNS() {
        // 리전과 프로파일을 명시적으로 설정하여 EC2 메타데이터 접근을 방지
        return AmazonSNSClientBuilder.standard()
                .withRegion(Regions.US_EAST_1) // 원하는 리전으로 변경 가능
                .withCredentials(new ProfileCredentialsProvider("default")) // 로컬 자격 증명 사용
                .build();
    }

    @Bean
    public NotificationMessagingTemplate notificationMessagingTemplate(AmazonSNS amazonSNS) {
        return new NotificationMessagingTemplate(amazonSNS);
    }
}
