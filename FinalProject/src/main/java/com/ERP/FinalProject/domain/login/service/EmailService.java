//// EmailService.java
//package com.ERP.FinalProject.domain.login.service;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
//
//@Service
//public class EmailService {
//
//    private final JavaMailSender mailSender;
//
//    public EmailService(JavaMailSender mailSender) {
//        this.mailSender = mailSender;
//    }
//
//    public void sendVerificationEmail(String toEmail, String code) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(toEmail);
//        message.setSubject("Password Reset Verification Code");
//        message.setText("Your verification code is: " + code);
//
//        mailSender.send(message);
//    }
//}
