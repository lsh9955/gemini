package com.gemini.userservice.service;

import com.gemini.userservice.dto.Alarm.BackgroundAlarmDto;
import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.Alarm.GeminiAlarmDto;
import com.gemini.userservice.dto.Alarm.LikeAlarmDto;
import com.gemini.userservice.dto.request.RequestContractGeminiDto;
import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.entity.Alarm;

import com.gemini.userservice.entity.Gallery;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.*;
import com.gemini.userservice.entity.Gemini;
import com.gemini.userservice.entity.UserInfo;
import com.gemini.userservice.repository.AlarmRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {
    private final UserPoseRepository userPoseRepository;


    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private GalleryRepository galleryRepository;

    @Autowired
    private GeminiRepository geminiRepository;

    @Autowired
    private GalleryService galleryService;

    private final static Long DEFAULT_TIMEOUT = 3600000L;

    private final static String NOTIFICATION_NAME = "notify";

    private final AlarmRepository alarmRepository;

    private final EmitterRepository emitterRepository;

    @Override
    public SseEmitter subscribe(String nickname) {

        Optional<UserInfo> userInfo = userInfoRepository.findByNickname(nickname);
        UserInfo user = userInfo.get();
        String username = user.getUsername();
        // 새로운 SseEmitter를 만든다
        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);

        // 유저 ID로 SseEmitter를 저장한다.
        emitterRepository.save(username, sseEmitter);

        // 세션이 종료될 경우 저장한 SseEmitter를 삭제한다.
        // 세션이 종료될 경우 예외 처리를 한다.
        sseEmitter.onCompletion(() -> {
            if (emitterRepository.contains(username)) {
                System.out.println("onCompletion 삭제ㅔㅔㅔㅔ[ㅔㅔㅔㅔㅔ");
                emitterRepository.delete(username);
            }
        });
        sseEmitter.onTimeout(() -> {
            if (emitterRepository.contains(username)) {
                System.out.println("타임아웃 삭제ㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔ");
                emitterRepository.delete(username);
            }
        });

        // 503 Service Unavailable 오류가 발생하지 않도록 첫 데이터를 보낸다.
        try {
            sseEmitter.send(SseEmitter.event().id("").name(NOTIFICATION_NAME).data("Connection completed"));
        } catch (IOException exception) {
            throw new RuntimeException("Failed to send SSE event", exception);
        }
        return sseEmitter;
    }

    public void send(String username, Long alarmId, ResponseAlarmDto responseAlarmDto) {
        // 유저 ID로 SseEmitter를 찾아 이벤트를 발생 시킨다.
        emitterRepository.get(username).ifPresentOrElse(sseEmitter -> {
            try {
                sseEmitter.send(SseEmitter.event().id(alarmId.toString()).name(NOTIFICATION_NAME).data(responseAlarmDto));
            } catch (IOException exception) {
                // IOException이 발생하면 저장된 SseEmitter를 삭제하고 예외를 발생시킨다.
                emitterRepository.delete(username);
            }
        }, () -> log.info("No emitter found"));
    }


    @Override
    public ResponseAlarmDto createFollowAlarm(String username, FollowAlarmDto alarmDto, SseEmitter emitter) {

        // 회원정보 찾아오기
        Optional<UserInfo> userInfo2 = userInfoRepository.findByUsername(username);

        UserInfo userInfo = userInfo2.get();

        // 인코딩 한 메세지 넣기
        String message = userInfo.getNickname() + "님이 회원님을 팔로우 했습니다.";
        String encodedMessage = new String(message.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);


        Alarm alarm = Alarm.builder()
                .follower(userInfo.getNickname())
                .memo(encodedMessage)
                .category(1)
                .build();
        alarmRepository.save(alarm);

        // 새로운 알림 데이터를 생성하고, 등록된 모든 SSE 클라이언트에 전송
        ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                .memo(encodedMessage)
                .build();



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
                .geminiNo(gallery.getGemini().getGeminiNo())
                .memo(encodedMessage)
//                .userInfo(userInfo)
                .category(2)
//                .nickname(gallery.getGemini().getUserInfo().getNickname())
                .build();
        alarmRepository.save(alarm);


        // 새로운 알람 데이터를 생성하고, 등록된 모든 SSE 클라이언트에 전송
        ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                .memo(encodedMessage)
                .build();


        return responseAlarmDto;

    }

    @Override
    public ResponseAlarmDto createGeminiAlarm(GeminiAlarmDto geminiAlarmDto) {

        // 닉네임 정보 가져오기
        Optional<UserInfo> userInfo2 = userInfoRepository.findByUsername(geminiAlarmDto.getUsername());
        UserInfo userInfo = userInfo2.get();
        String nickname = userInfo.getNickname();
        geminiAlarmDto.setNickname(nickname);

        // 인코딩한 메세지 넣기
        String messege = "Gemini 소환이 완료되었습니다.";
        String encodedMessage = new String(messege.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);

        // 알람 엔티티 채우기
        Alarm alarm = Alarm.builder()
                .memo(encodedMessage)
                .geminiNo(geminiAlarmDto.getGeminiNo())
//                .userInfo(userInfo)
                .category(3)
//                .nickname(nickname)
                .build();
        alarmRepository.save(alarm);

        // 새로운 알람 데이터를 생성하고, 등록된 모든 SSE 클라이언트에 전송
        ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                .memo(encodedMessage)
                .build();

        send(userInfo.getUsername(), alarm.getAlarmId(), responseAlarmDto);


//        for (SseEmitter sseEmitter : emitters) {
//            try {
//                sseEmitter.send(responseAlarmDto);
//            } catch (IOException ex) {
//                // SSE 클라이언트 연결이 종료된 경우, 리스트에서 제거
//                emitters.remove(emitter);
//            }
//
//        }


        return responseAlarmDto;

    }

    @Override
    public ResponseAlarmDto createBackgroundAlarm(BackgroundAlarmDto backgroundAlarmDto, SseEmitter emitter) {
        // 닉네임 정보 가져오기
        Optional<UserInfo> userInfo2 = userInfoRepository.findByUsername(backgroundAlarmDto.getUsername());
        UserInfo userInfo = userInfo2.get();
        String nickname = userInfo.getNickname();
        backgroundAlarmDto.setNickkname(nickname);

        // 인코딩한 메세지 넣기
        String messege = "배경 생성이 완료되었습니다.";
        String encodedMessage = new String(messege.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);

        // 알람 엔티티 채우기
        Alarm alarm = Alarm.builder()
                .memo(encodedMessage)
//                .userInfo(userInfo)
                .category(4)
//                .nickname(nickname)
                .imageUrl(backgroundAlarmDto.getImageUrl())
                .build();
        alarmRepository.save(alarm);

        // 새로운 알람 데이터를 생성하고, 등록된 모든 SSE 클라이언트에 전송
        ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                .memo(encodedMessage)
                .build();


        return responseAlarmDto;


    }


    @Override
    public String contractGemini(String username, RequestContractGeminiDto requestContractGeminiDto) {

        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        if(userInfo.isPresent()) {
            UserInfo user = userInfo.get();
            Gemini gemini = geminiRepository.findByGeminiNo(requestContractGeminiDto.getGeminiNo());

            gemini.setDescription(requestContractGeminiDto.getDescription());
            gemini.setName(requestContractGeminiDto.getName());

            gemini.contract(user);
            geminiRepository.save(gemini);

            if(gemini.getIsPublic()) {
                galleryService.createGallery(gemini.getGeminiNo());
            }
            return "success";
        }
        return null;
    }


    @Override
    public String deleteAlarm(String username, Long alarmId) {
//        Alarm alarm = alarmRepository.findAlarmById(alarmId);
//        if (alarm != null) {
//            alarmRepository.delete(alarm);
//            return "Success"; // 삭제 성공
//        } else {
//            return "fail"; // 알람을 찾을 수 없음
//        }
        return null;
    }



}

