package com.gemini.userservice.api;

import com.gemini.userservice.repository.PaymentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pay")
public class PaymentsContorller {

    @Autowired
    private PaymentsRepository paymentsRepository;

//    @PatchMapping
//    public ResponseEntity<?> u

}
