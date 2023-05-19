package com.gemini.userservice.service;

import com.gemini.userservice.dto.PairchildDto;
import com.gemini.userservice.entity.Pairchild;
import com.gemini.userservice.repository.PairchildRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PairchildServiceImpl implements PairchildService {

    @Autowired
    private PairchildRepository pairChildRepository;

    @Override
    public List<PairchildDto> getAllPairchilds() {
        List<Pairchild> pairChildren = pairChildRepository.findAll();
        return pairChildren.stream()
                .map(pairchild -> PairchildDto.builder()
                        .name(pairchild.getName())
                        .image(pairchild.getImage())
                        .build())
                .collect(Collectors.toList());
    }
}
