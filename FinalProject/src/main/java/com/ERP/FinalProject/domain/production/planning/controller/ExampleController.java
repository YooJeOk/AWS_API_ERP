package com.ERP.FinalProject.domain.production.planning.controller;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.response.SingleMessageSentResponse;
import net.nurigo.sdk.message.service.DefaultMessageService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ExampleController {

    final DefaultMessageService messageService;

    public ExampleController() {
        
        this.messageService = NurigoApp.INSTANCE.initialize("NCSOQ3VSWQ7UOIOX", "YQD7NH3OAK7TCBFSB7WITZT5KRKBDYIX", "https://api.coolsms.co.kr");
    }

    
    @PostMapping("/send-one")
    public ResponseEntity<?> sendOne() {
        try {
            Message message = new Message();
            message.setFrom("01099642974");
            message.setTo("01099642974");
            message.setText("온도가 위험수치에 도달하였습니다.");

            SingleMessageSentResponse response = this.messageService.sendOne(new SingleMessageSendingRequest(message));
            System.out.println(response);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("문자 전송 중 오류가 발생했습니다.");
        }
    }
}
