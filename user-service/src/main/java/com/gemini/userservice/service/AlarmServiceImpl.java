package com.gemini.userservice.service;

import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.Alarm.LikeAlarmDto;
import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.entity.Alarm;

import com.gemini.userservice.entity.Gallery;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.AlarmRepository;
import com.gemini.userservice.repository.GalleryRepository;
import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.AlarmRepository;
import com.gemini.userservice.repository.GeminiRepository;
import com.gemini.userservice.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class AlarmServiceImpl implements AlarmService {

    @Autowired
    private AlarmRepository alarmRepository;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private GeminiRepository geminiRepository;


    // SSE 클라이언트를 저장하는 리스트
    private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();


    @Override
    public ResponseAlarmDto createFollowAlarm(String username, FollowAlarmDto alarmDto, SseEmitter emitter) {

        // 회원정보 찾아오기
        Optional<UserInfo> userInfo2 = userInfoRepository.findByUsername(username);

        UserInfo userInfo = userInfo2.get();

        // 인코딩 한 메세지 넣기
        String message = userInfo.getNickname() + "님이 회원님을 팔로우 했습니다.";
        String encodedMessage = new String(message.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);


        Alarm alarm = Alarm.builder()
                .nickname(alarmDto.getGetAlarmNickName())
                .memo(encodedMessage)
                .userInfo(userInfo)
                .category(1)
                .checked(false)
                .build();
        alarmRepository.save(alarm);

        // 새로운 알림 데이터를 생성하고, 등록된 모든 SSE 클라이언트에 전송
        ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                .memo(encodedMessage)
                .build();

        for (SseEmitter sseEmitter : emitters) {
            try {
                sseEmitter.send(responseAlarmDto);
            } catch (IOException ex) {
                // SSE 클라이언트 연결이 종료된 경우, 리스트에서 제거
                emitters.remove(emitter);
            }

        }

        return responseAlarmDto;
    }


    @Override

    public ResponseAlarmDto createLikeAlarm(String username, LikeAlarmDto likeAlarmDto, SseEmitter emitter) {


        // 회원정보 찾아오기
        Optional<UserInfo> userInfo2 = userInfoRepository.findByUsername(username);

        UserInfo userInfo = userInfo2.get();

        // 갤러리 테이블 찾아오기
        Optional<Gallery> gallery1 = Optional.ofNullable(galleryRepository.findByGalleryNo(likeAlarmDto.getGalleryNo()));
        Gallery gallery = gallery1.get();

        // gemini 테이블 찾아오기
//        List<Gemini> gemini1 =
//        List<UserInfo> userInfo = geminiRepository.findByUserInfo();

        // userinfo 닉네임 찾아오기
        String nickname = gallery.getGemini().getUserInfo().getNickname();

        // likealarmdto 채우기
        likeAlarmDto.setGetAlarmNickName(nickname);
        likeAlarmDto.setGeminiName(gallery.getGemini().getName());
        likeAlarmDto.setTotalLike(gallery.getGemini().getTotalLike());

        // 인코딩한 메세지 넣기
        String messege = gallery.getGemini().getName() + "이 많은 관심을 받고 있습니다.";
        String encodedMessage = new String(messege.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);

        // 알람 엔티티 채우기
        Alarm alarm = Alarm.builder()
                .memo(encodedMessage)
                .userInfo(userInfo)
                .category(2)
                .checked(false)
                .nickname(gallery.getGemini().getUserInfo().getNickname())
                .build();
        alarmRepository.save(alarm);


        // 새로운 알람 데이터를 생성하고, 등록된 모든 SSE 클라이언트에 전송
        ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                .memo(encodedMessage)
                .build();

        for (SseEmitter sseEmitter : emitters) {
            try {
                sseEmitter.send(responseAlarmDto);
            } catch (IOException ex) {
                // SSE 클라이언트 연결이 종료된 경우, 리스트에서 제거
                emitters.remove(emitter);
            }

        }

        return responseAlarmDto;

    }

    @Override
    public String contractGemini(String username, Long geminiNo) {

        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        if(userInfo.isPresent()) {
            UserInfo user = userInfo.get();
            Gemini gemini = geminiRepository.findByGeminiNo(geminiNo);
            gemini.contract(user);
            geminiRepository.save(gemini);
            return "success";
        }
        return null;
    }


    @Override
    public String deleteAlarm(String username, Long alarmId) {
        Alarm alarm = alarmRepository.findAlarmById(alarmId);
        if (alarm != null) {
            alarmRepository.delete(alarm);
            return "Success"; // 삭제 성공
        } else {
            return "fail"; // 알람을 찾을 수 없음
        }
    }


}

