// UserService.java
package com.ERP.FinalProject.domain.login.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ERP.FinalProject.domain.login.model.User;
import com.ERP.FinalProject.domain.login.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 아이디와 비밀번호를 비교하여 로그인 여부를 반환하는 메서드
    public boolean authenticate(String username, String password) {
        User user = userRepository.findByUsername(username);
        return user != null && user.getPassword().equals(password);
    }

    // 이메일로 사용자 조회
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // 사용자 비밀번호 업데이트
    public void updatePassword(User user, String newPassword) {
        user.setPassword(newPassword);
        userRepository.save(user);
    }
}
