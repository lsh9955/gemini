package com.gemini.authservice.config.oauth;

import com.gemini.authservice.config.auth.PrincipalDetails;
import com.gemini.authservice.config.oauth.provider.GoogleUserInfo;
import com.gemini.authservice.config.oauth.provider.OAuth2UserInfo;
import com.gemini.authservice.config.oauth.provider.TwitterUserInfo;
import com.gemini.authservice.model.User;
import com.gemini.authservice.repository.UserRepository;
import com.gemini.authservice.service.ExternalApiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Optional;


@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ExternalApiService externalApiService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest); // view user profile

        return processOAuth2User(userRequest, oAuth2User);
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

        OAuth2UserInfo oAuth2UserInfo = null;

        if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
            System.out.println("================😶 google!!");
            oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
        } else if (userRequest.getClientRegistration().getRegistrationId().equals("twitter")) {
            System.out.println("================😶 twitter!!");
            oAuth2UserInfo = new TwitterUserInfo(oAuth2User.getAttributes());
        } else {
            System.out.println("We service only google, twitter login for now");
            throw new IllegalArgumentException("We only support Google and Twitter login for now.");
        }

        Optional<User> userOptional = userRepository.findByProviderAndProviderId(oAuth2UserInfo.getProvider(), oAuth2UserInfo.getProviderId());

        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get(); // if user exists, update it
//            user.setEmail(oAuth2UserInfo.getEmail()); // Decided not to use email for now
            userRepository.save(user);
        } else {
            // if user doesn't exist, sign-in directly
            user = User.builder()
                    .username(oAuth2UserInfo.getProvider() + "_" + oAuth2UserInfo.getProviderId())
                    .password("dummyString_for_now")
//                    .email(oAuth2UserInfo.getEmail()) // Decided not to use email for now
                    .role("ROLE_USER")
                    .provider(oAuth2UserInfo.getProvider())
                    .providerId(oAuth2UserInfo.getProviderId())
                    .build();

            externalApiService.sendUserToUserServiceServer(user); // after enrolling userinfo on user_service
            userRepository.save(user); // save user on USER TABLE
        }

        return new PrincipalDetails(user, oAuth2User.getAttributes());

    }
}
