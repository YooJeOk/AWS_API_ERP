// UserRepository.java
package com.ERP.FinalProject.domain.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ERP.FinalProject.domain.login.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
    User findByEmail(String email); // 이메일을 통해 사용자 조회
}
