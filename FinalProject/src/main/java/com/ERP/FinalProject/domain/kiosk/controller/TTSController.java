package com.ERP.FinalProject.domain.kiosk.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import org.json.JSONObject;

@RestController
public class TTSController {

    @Value("${google.tts.api.key}")
    private String apiKey;

    @GetMapping("/api/tts")
    public ResponseEntity<byte[]> generateTTS(@RequestParam String text) {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String url = "https://texttospeech.googleapis.com/v1/text:synthesize?key=" + apiKey;
            
            JSONObject requestJson = new JSONObject();
            JSONObject input = new JSONObject();
            input.put("text", text);

            JSONObject voice = new JSONObject();
            voice.put("languageCode", "ko-KR");
            voice.put("ssmlGender", "FEMALE");
            voice.put("name", "ko-KR-Wavenet-B"); 

            JSONObject audioConfig = new JSONObject();
            audioConfig.put("audioEncoding", "MP3");
            audioConfig.put("pitch", -2); // 음정 조절
            audioConfig.put("speakingRate", 1.2); // 속도 조절 

            requestJson.put("input", input);
            requestJson.put("voice", voice);
            requestJson.put("audioConfig", audioConfig);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(requestJson.toString(), headers);

            org.springframework.http.ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);
            JSONObject responseBody = new JSONObject(response.getBody());
            String audioContent = responseBody.getString("audioContent");

            byte[] audioBytes = java.util.Base64.getDecoder().decode(audioContent);
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            return ResponseEntity.ok().headers(responseHeaders).body(audioBytes);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
