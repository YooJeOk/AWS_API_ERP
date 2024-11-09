package com.ERP.FinalProject.domain.production.monitoring.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@Service
public class SmsService {

    @Value("${coolsms.apiKey}")
    private String apiKey;

    @Value("${coolsms.apiSecret}")
    private String apiSecret;

    private final String receiverPhoneNumber = "RECEIVER_PHONE_NUMBER"; // 고정된 수신자 번호 설정
    private final String senderPhoneNumber = "SENDER_PHONE_NUMBER"; // 사전에 등록된 발신자 번호 설정
    private final String apiUrl = "https://api.coolsms.co.kr/messages/v4/send-many";

    public void sendSms(String message) {
        try {
            // JSON 요청 본문 생성
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("from", senderPhoneNumber); // 발신자 번호
            jsonObject.put("to", new String[]{receiverPhoneNumber}); // 수신자 번호 배열
            jsonObject.put("text", message); // 메시지 내용

            // JSON 메시지 구조에 맞게 messages 필드 추가
            JSONObject messageObject = new JSONObject();
            messageObject.put("to", receiverPhoneNumber);
            messageObject.put("from", senderPhoneNumber);
            messageObject.put("text", message);

            jsonObject.put("messages", new JSONObject[]{messageObject});

            // 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBasicAuth(apiKey, apiSecret);

            // HTTP 요청 보내기
            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<String> request = new HttpEntity<>(jsonObject.toString(), headers);
            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

            System.out.println("SMS 전송 성공: " + response.getBody());
        } catch (Exception e) {
            System.err.println("SMS 전송 실패: " + e.getMessage());
        }
    }
}
