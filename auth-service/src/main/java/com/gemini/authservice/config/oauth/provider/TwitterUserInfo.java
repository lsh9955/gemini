package com.gemini.authservice.config.oauth.provider;

import java.util.Map;

public class TwitterUserInfo implements OAuth2UserInfo {


    private Map<String, Object> attributes;

    public TwitterUserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

//    @Override
//    public String getEmail() {
//        return (String) attributes.get("email");
//    }

    @Override
    public String getProvider() {
        return "twitter";
    }
}
