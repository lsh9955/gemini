package com.gemini.authservice.config.auth;

import com.gemini.authservice.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

public class PrincipalDetails implements UserDetails, OAuth2User {

    private static final Long serialVersionUID = 1L;
    private User user;
    private Map<String, Object> attributes;

    // for General security login
    public PrincipalDetails(User user) {
        this.user = user;
    }

    // for OAuth2 login
    public PrincipalDetails(User user, Map<String, Object> attributes) {
        this.user = user;
        this.attributes = attributes;
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> collect =  new ArrayList<GrantedAuthority>();
        collect.add(()->{ return user.getRole(); });
        return collect;
    }

    // userinfo from resource Server
    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    //PK of user 😀 this is weird.
    @Override
    public String getName() {
        return user.getId() + ""; // for type casting
    }

    public Long getId() {
        return user.getId();
    } // added for JwtAuthenticationFilter


}
