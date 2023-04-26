package com.gemini.authservice.config.oauth.provider;

public interface OAuth2UserInfo {
    String getProviderId();
    String getProvider();
//    String getEmail(); // Decided not to use email for now
    String getName();
}
