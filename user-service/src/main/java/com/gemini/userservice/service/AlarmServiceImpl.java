package com.gemini.userservice.service;

import com.gemini.userservice.dto.Alarm.BackgroundAlarmDto;
import com.gemini.userservice.dto.Alarm.FollowAlarmDto;
import com.gemini.userservice.dto.Alarm.GeminiAlarmDto;
import com.gemini.userservice.dto.Alarm.LikeAlarmDto;
import com.gemini.userservice.dto.AlarmDto;
import com.gemini.userservice.dto.request.RequestContractGeminiDto;
import com.gemini.userservice.dto.response.ResponseAlarmDto;
import com.gemini.userservice.dto.response.ResponseGetAllAlarmsDto;
import com.gemini.userservice.entity.*;

import com.gemini.userservice.repository.*;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@Slf4j
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService {

    private final UserPoseRepository userPoseRepository;

    private final UserInfoRepository userInfoRepository;

    private final GalleryRepository galleryRepository;

    private final GeminiRepository geminiRepository;

    private final GalleryService galleryService;

    private final static Long DEFAULT_TIMEOUT = 3600000L;

    private final static String NOTIFICATION_NAME = "notify";

    private final AlarmRepository alarmRepository;

    private final AlarmDataRepository alarmDataRepository;

    private final AlarmUserRepository alarmUserRepository;

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
        sseEmitter.onTimeout(() -> {
            if (emitterRepository.contains(username)) {
                System.out.println("타임아웃 삭제ㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔㅔ");
                emitterRepository.delete(username);
            }
        });

        sseEmitter.onCompletion(() -> {
            if (emitterRepository.contains(username)) {
                System.out.println("onCompletion 삭제ㅔㅔㅔㅔ[ㅔㅔㅔㅔㅔ");
                emitterRepository.delete(username);
            }
        });


        // 503 Service Unavailable 오류가 발생하지 않도록 첫 데이터를 보낸다.
        try {
            sseEmitter.send(SseEmitter.event().id(username).name(NOTIFICATION_NAME).data("Connection completed"));
        } catch (IOException exception) {
            throw new RuntimeException("Failed to send SSE event", exception);
        }
        return sseEmitter;
    }

    public void send(String username, Long alarmId, ResponseAlarmDto responseAlarmDto) {
        // 유저 ID로 SseEmitter를 찾아 이벤트를 발생 시킨다.
        emitterRepository.get(username).ifPresentOrElse(sseEmitter -> {
            try {
                System.out.println("보내기보내기보내기");
                sseEmitter.send(SseEmitter.event().id(alarmId.toString()).name(NOTIFICATION_NAME).data(responseAlarmDto));
            } catch (IOException exception) {
                // IOException이 발생하면 저장된 SseEmitter를 삭제하고 예외를 발생시킨다.
                System.out.println(exception);
                emitterRepository.delete(username);
            }
        }, () -> log.info("No emitter found"));
    }


    @Override
    public void createFollowAlarm(String username, FollowAlarmDto alarmDto) {
        log.info("팔로우 누른 사람: " + username);
        log.info("팔로우 당한 사람: " + alarmDto.getGetAlarmNickName());
        // 회원정보 찾아오기
        Optional<UserInfo> userInfo2 = userInfoRepository.findByUsername(username);
        UserInfo me = userInfo2.get();

        // 인코딩 한 메세지 넣기
        String message = me.getNickname() + "님이 회원님을 팔로우 했습니다.";
        String encodedMessage = new String(message.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);

        Alarm alarm = Alarm.builder()
                .build();
        alarmRepository.save(alarm);

        Long alarmId = alarm.getAlarmId();
        AlarmData alarmData = AlarmData.builder().
                alarmId(alarmId).
                category(1).
                follower(me.getNickname()).
                memo(encodedMessage).
                build();
        alarmDataRepository.save(alarmData);

        Optional<UserInfo> getAlarmUserInfo = userInfoRepository.findByNickname(alarmDto.getGetAlarmNickName());
        UserInfo you = getAlarmUserInfo.get();
        log.info("팔로우 당한 사람 2트: " + you.getNickname());
        Optional<AlarmUser> alarmUser = alarmUserRepository.findByUserNo(you.getUserPk());
        if (alarmUser.isPresent()) {
            AlarmUser alarmUser1 = alarmUser.get();
            List<Long> alarmIds = alarmUser1.getAlarmIds();
            alarmIds.add(alarmId);
            alarmUser1.update(alarmIds);
            alarmUserRepository.save(alarmUser1);
        }
        else {
            List<Long> alarmIds = new ArrayList<>();
            alarmIds.add(alarmId);
            AlarmUser alarmUser1 = AlarmUser.builder().
                    userNo(you.getUserPk()).
                    alarmIds(alarmIds).
                    build();
            alarmUserRepository.save(alarmUser1);
        }
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
                .build();
        alarmRepository.save(alarm);


        // 새로운 알람 데이터를 생성하고, 등록된 모든 SSE 클라이언트에 전송
        ResponseAlarmDto responseAlarmDto = ResponseAlarmDto.builder()
                .memo(encodedMessage)
                .build();


        return responseAlarmDto;

    }

    @Override
    public void createGeminiAlarm(GeminiAlarmDto geminiAlarmDto) {

        // 닉네임 정보 가져오기
        Optional<UserInfo> userInfo2 = userInfoRepository.findByUsername(geminiAlarmDto.getUsername());
        UserInfo userInfo = userInfo2.get();

        // 인코딩한 메세지 넣기
        String messege = "Gemini 소환이 완료되었습니다.";
        String encodedMessage = new String(messege.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
        log.info(encodedMessage);
        // 알람 엔티티 채우기
        Alarm alarm = Alarm.builder()
                .build();
        alarmRepository.save(alarm);
        Long alarmId = alarm.getAlarmId();
        AlarmData alarmData = AlarmData.builder().
                alarmId(alarmId).
                category(3).
                geminiNo(geminiAlarmDto.getGeminiNo()).
                memo(encodedMessage).
                build();
        alarmDataRepository.save(alarmData);

        Optional<AlarmUser> alarmUser = alarmUserRepository.findByUserNo(userInfo.getUserPk());
        if (alarmUser.isPresent()) {
            AlarmUser alarmUser1 = alarmUser.get();
            List<Long> alarmIds = alarmUser1.getAlarmIds();
            alarmIds.add(alarmId);
            alarmUser1.update(alarmIds);
            alarmUserRepository.save(alarmUser1);
        }
        else {
            List<Long> alarmIds = new ArrayList<>();
            alarmIds.add(alarmId);
            AlarmUser alarmUser1 = AlarmUser.builder().
                    userNo(userInfo.getUserPk()).
                    alarmIds(alarmIds).
                    build();
            alarmUserRepository.save(alarmUser1);
        }
//        send(userInfo.getUsername(), alarm.getAlarmId(), responseAlarmDto);
    }

    @Override
    public void createBackgroundAlarm(BackgroundAlarmDto backgroundAlarmDto) {
        // 닉네임 정보 가져오기
        Optional<UserInfo> userInfo2 = userInfoRepository.findByUsername(backgroundAlarmDto.getUsername());
        UserInfo userInfo = userInfo2.get();

        // 인코딩한 메세지 넣기
        String messege = "배경 생성이 완료되었습니다.";
        String encodedMessage = new String(messege.getBytes(StandardCharsets.UTF_8), StandardCharsets.UTF_8);
        log.info(encodedMessage);
        // 알람 엔티티 채우기
        Alarm alarm = Alarm.builder()
                .build();
        alarmRepository.save(alarm);
        Long alarmId = alarm.getAlarmId();
        System.out.println(alarmId);
        AlarmData alarmData = AlarmData.builder().
                alarmId(alarmId).
                category(4).
                imageUrl(backgroundAlarmDto.getImageUrl()).
                memo(encodedMessage).
                build();
        alarmDataRepository.save(alarmData);

        Optional<AlarmUser> alarmUser = alarmUserRepository.findByUserNo(userInfo.getUserPk());
        if (alarmUser.isPresent()) {
            AlarmUser alarmUser1 = alarmUser.get();
            List<Long> alarmIds = alarmUser1.getAlarmIds();
            alarmIds.add(alarmId);
            alarmUser1.update(alarmIds);
            alarmUserRepository.save(alarmUser1);
        }
        else {
            List<Long> alarmIds = new ArrayList<>();
            alarmIds.add(alarmId);
            AlarmUser alarmUser1 = AlarmUser.builder().
                    userNo(userInfo.getUserPk()).
                    alarmIds(alarmIds).
                    build();
            alarmUserRepository.save(alarmUser1);
        }
    }

    @Override
    public ResponseGetAllAlarmsDto getAllAlarms(String username) {

        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        if (userInfo.isPresent()) {
            UserInfo user = userInfo.get();
            Long userNo = user.getUserPk();
            Optional<AlarmUser> alarmUser = alarmUserRepository.findById(userNo);
            if (alarmUser.isPresent()) {
                AlarmUser alarmUser1 = alarmUser.get();
                List<Long> alarmIds = alarmUser1.getAlarmIds();
                List<AlarmDto> alarmDtos = new ArrayList<>();
                if (alarmIds == null) {
                    return null;
                }
                if (alarmIds.size() == 0) {
                    return null;
                }
                for (Long alarmId : alarmIds) {
                    Optional<AlarmData> alarmData = alarmDataRepository.findById(alarmId);
                    AlarmData data = alarmData.get();
                    Integer category = data.getCategory();
                    AlarmDto alarmDto = AlarmDto.builder().
                            alarmId(alarmId).
                            category(data.getCategory()).
                            memo(data.getMemo()).
                            build();
                    if (category == 1) {
                        alarmDto.setFollower(data.getFollower());
                    } else if (category == 2) {
                        alarmDto.setGalleryNo(data.getGalleryNo());
                    } else if (category == 3) {
                        alarmDto.setGeminiNo(data.getGeminiNo());
                    } else if (category == 4) {
                        alarmDto.setImageUrl(data.getImageUrl());
                    }
                    alarmDtos.add(alarmDto);
                }
                ResponseGetAllAlarmsDto responseGetAllAlarmsDto = new ResponseGetAllAlarmsDto(alarmDtos);
                return responseGetAllAlarmsDto;
            }
            return null;
        }
        return null;
    }

    @Override
    public String contractGemini(String username, RequestContractGeminiDto requestContractGeminiDto) {

        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        if(userInfo.isPresent()) {
            UserInfo user = userInfo.get();
            Gemini gemini = geminiRepository.findByGeminiNo(requestContractGeminiDto.getGeminiNo());

            gemini.setDescription(requestContractGeminiDto.getDescription());
            gemini.setName(requestContractGeminiDto.getName());
            gemini.setIsPublic(requestContractGeminiDto.getIsPublic());

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
        Alarm alarm = alarmRepository.findByAlarmId(alarmId);
        Optional<UserInfo> userInfo = userInfoRepository.findByUsername(username);
        UserInfo user = userInfo.get();
        if (alarm != null) {
            alarmRepository.delete(alarm);
            Optional<AlarmData> alarmData = alarmDataRepository.findById(alarmId);
            AlarmData data = alarmData.get();
            alarmDataRepository.delete(data);
            Optional<AlarmUser> alarmUser = alarmUserRepository.findById(user.getUserPk());
            AlarmUser alarmUser1 = alarmUser.get();
            List<Long> alarmIds = alarmUser1.getAlarmIds();
            alarmIds.remove(alarmId);
            alarmUser1.update(alarmIds);
            alarmUserRepository.save(alarmUser1);
            return "Success"; // 삭제 성공
        }
        return "fail"; // 알람을 찾을 수 없음
    }



}

