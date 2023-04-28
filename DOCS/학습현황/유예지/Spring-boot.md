# 스프링 부트 기초

# 스프링 부트 기초

## application.properties

- 여기서 db 관련된 정보를 넣어놓는다

## REST API

### **API 란?**

응용 프로그램에서 사용할 수 있도록 다른 응용 프로그램을 제어할 수 있게 만든 인터페이스를 뜻함

API를 사용하면 내부 구현 로직을 알지 못해도 정의 되어 있는 기능을 쉽게 사용할 수 있음

인터페이스란? 어떤 장치간 정보를 교환하기 위한 수단이나 방법을 의미함 ⇒ 하드웨어 적인 의미

### **REST 란?(Representational State Transfer)**

자원의 이름으로 구분하여 해당 자원의 상태를 교환하는 것을 의미 ⇒ 여기서 자원은 데이터

서버와 클라이언트의 통신 방식 중 하나임

HTTP URI를 통해 자원을 명시하고 HTTP method를 통해 자원을 교환하는 것

⇒ 메서드: create, read, update, delete

### **REST 특징**

- server-client 구조
  - 자원이 있는 쪽이 server, 요청하는 쪽이 client
  - 클라이언트와 서버가 독립적으로 분리되어 있어야 함 ⇒ 자원 공유 안함
- Stateless
  - 요청 간에 클라이언트 정보가 서버에 저장되지 않음
  - 서버는 각각의 요청을 완전히 별개의 것으로 인식하고 처리
- Cacheable
  - HTTP 프로토콜을 그대로 사용하기 때문에 HTTP의 특징인 캐싱 기능을 적용
  - 대량의 요청을 효율적으로 처리하기 위해 캐시를 사용
- 계층화
  - 클라이언트는 서버의 구성과 상관 없이 REST API 서버로 요청
  - 서버는 다중 계층으로 구성될 수 있음(로드밸런싱, 보안 요소, 캐시 등)
- Code on Demand(Optional) ⇒ 프론트 영역
  - 요청을 받으면 서버에서 클라이언트 코드 또는 스크립트(로직)을 전달하여 클라이언트 기능 확장
- 인터페이스 일관성
  - 정보가 표준 형식으로 전송되기 위해 구성 요소간 통합 인터페이스를 제공
  - HTTP 프로토콜을 따르는 모든 플랫폼에서 사용 가능하게끔 설계

### **REST의 장점**

- HTTP 표준 프로토콜을 사용하는 모든 플랫폼에서 호환 가능
- 서버와 클라이언트의 역할을 명확하게 분리
- 여러 서비스 설계에서 생길 수 있는 문제 최소화
-

### **REST API란?**

REST 아키텍처의 조건을 준수하는 어플리케이션 프로그래밍 인터페이스를 뜻함

최근 많은 API가 REST API로 제공되고 있음

일반적으로 REST 아키텍처를 구현하는 웹 서비스를 RESTful 하다고 표한

### **REST API 특징**

REST 기반으로 시스템을 분산하여 확장성과 재사용성을 높임 ⇒ 로드밸런싱 가능

HTTP 표준을 따르고 있어 여러 프로그래밍 언어로 구현 가능

### **REST API 설계**

- 웹 기반의 REST API를 설계할 경우에는 URI를 통해 자원을 표현해야 함
- 자원에 대한 조작은 HTTP Method(CRUD)를 통해 표현해야 함
  - URI에 행위가 들어가면 안됨
  - header를 통해 crud를 표현하여 동작을 요청해야 함
- 메세지를 통한 리소스 조작
  - header를 통해 content-type을 지정하여 데이터를 전달 ⇒ 프론트에서
  - 대표적 형식으로는 html, xml, json, text가 있음

### **REST API 설계 규칙**

- URI에는 소문자를 사용
- resource의 이름이나 url가 길어질 경우 하이픈을 통해 가독성을 높일 수 있음
- 언더바 사용 금지
- 파일 확장자를 표현하지 않음

# CRUD API 실습

## GET API

### @GetMapping(without param)

- 별도의 파라미터 없이 GET API를 호출하는 경우

```java
@GetMapping(value="name")
public String getName() {
	return "Flature";
}
```

### @PathVariable

- GET 형식의 요청에서 파라미터를 전달하기 위해 URL에 값을 담아 요청하는 방법
- 아래 방식은 @GetMapping 에서 사용된 {변수}의 이름과 메소드의 매개변수를 일치

```java
@GetMapping(value="/variable1/{variable}")
// 아래 String 값과 이름을 일치 시켜아 함
public String getName(@PathVariable String variable) {
	return "Flature";
}

// 아래 String 값과 이름이 불일치 할 경우 => 사용된 {변수}의 이름과 메소드의 매개변수가 다를 경우 사용하는 방식
// 변수의 관리의 용이를 위해 사용되는 방식
@GetMapping(value = "/variable2/{variable}")
public String getVariable2(@PathVariable("variable")String var) {
	return var;
}
```

### @RequestParam

- GET 형식의 요청에서 쿼리 문자열을 전달하기 위해 사용되는 방법
- “?”를 기준으로 우측에 {키}={값}의 형태로 전달되며, 복수 형태로 전달할 경우 & 을 사용함

```java
@GetMapping(value="/request1")
public String getReqeustParam1(
		@RequestParam String name,
		@RequestParam String email,
		@RequestParam String organization) {
	return name + "" + email + ""+ organization;
}

// 어떤 값이 들어올 지 모르는 경우
@GetMapping(value="/request2")
public String getReqeustParam2(@RequestParam Map<String, String>param) {
//<> 안에 있는 것은 key, value의 type이다.
	StringBuilder sb = new StringBuilder();
param.entrySet().forEach(map -> {
	sb.append(map.getKey()+ ":" + map.getValue() + "\n");
});
	return sb.toString();
}
```

### DTO 사용

- get 형식의 요청에서 쿼리 문자열을 전달하기 위해 사용되는 방법
- key와 value가 정해져 있지만, 받아야할 파라미터가 많을 경우 DTO. 객체를 사용한 방식

```java
@GetMapping(value="/request3")
public String getReqeustParam3(MemberDTO memberDTO) {
	// return memberDTO.getName() + "" + memberDTO.getEamil() + "" + memberDTO.getOrganization();
	return memberDTO.toString();
}

public class MemberDTO {
	private String name;
	private String email;
	private String organization;
}
```

```java
package com.example.testpjt.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.testpjt.dto.MemberDTO;

@RestController
@RequestMapping("/api/v1/get-api")
public class GetController {

    // http://localhost:8080/api/v1/get-api/hello
    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String getHello() {
        return "Hello Around Hub Studio!";
    }

    // http://localhost:8080/api/v1/get-api/name
    @GetMapping(value = "/name")
    public String getName() {
        return "Flature";
    }

    // http://localhost:8080/api/v1/get-api/variable1/{String 값}
    @GetMapping(value = "/variable1/{variable}")
    public String getVariable1(@PathVariable String variable) {
        return variable;
    }

    // http://localhost:8080/api/v1/get-api/variable2/{String 값}
    @GetMapping(value = "/variable2/{variable}")
    public String getVariable2(@PathVariable("variable") String var) {
        return var;
    }

    // http://localhost:8080/api/v1/get-api/request1?name=flature&email=thinkground.flature@gmail.com&organization=thinkground
    @GetMapping(value = "/request1")
    public String getRequestParam1(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String organization) {
        return name + " " + email + " " + organization;
    }

    // http://localhost:8080/api/v1/get-api/request2?key1=value1&key2=value2
    @GetMapping(value = "/request2")
    public String getRequestParam2(@RequestParam Map<String, String> param) {
        StringBuilder sb = new StringBuilder();

        param.entrySet().forEach(map -> {
            sb.append(map.getKey() + " : " + map.getValue() + "\n");
        });

    /*
    param.forEach((key, value) -> sb.append(key).append(" : ").append(value).append("\n"));
     */

        return sb.toString();
    }

    // http://localhost:8080/api/v1/get-api/request3?name=flature&email=thinkground.flature@gmail.com&organization=thinkground
    @GetMapping(value="/request3")
    public String getRequestParam3(MemberDTO memberDTO){
        //return memberDTO.getName() + " " + memberDTO.getEmail() + " " + memberDTO.getOrganization();
        return memberDTO.toString();
    }
}
```

## POST API

- 리소스를 추가하기 위해 사용되는 API
- **@PostMapping:** post api 제작하기 위해 사용되는 어노테이션
  - 일반적으로 추가하고자 하는 resource를 http body에 추가하여 서버에 요청
  - 그렇기 때문에 requestbody를 이용하여 body에 담겨 있는 값을 받아야함

```java
// http://localhost:8080/api/v1/post-api/member
    @PostMapping(value = "/member")
    public String postMember(@RequestBody Map<String, Object> postData) {
        StringBuilder sb = new StringBuilder();

        postData.entrySet().forEach(map -> {
            sb.append(map.getKey() + " : " + map.getValue() + "\n");
        });

    /*
    param.forEach((key, value) -> sb.append(key).append(" : ").append(value).append("\n"));
     */

        return sb.toString();
    }
```

### DTO 사용

- **requestbody가 꼭 있어야 함!!!**

```java
// http://localhost:8080/api/v1/post-api/member2
    @PostMapping(value = "/member2")
    public String postMemberDto(@RequestBody MemberDTO memberDTO) {
        return memberDTO.toString();
    }
```

```java
package com.example.demo.controller;

import java.util.Map;

import com.example.demo.dto.MemberDTO;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.MemberDTO;

@RestController
// 이런식으로 꼭 post mapping이 필요하다!!
@RequestMapping(value = "/api/v1/post-api", method = RequestMethod.POST)
public class PostController {

    // http://localhost:8080/api/v1/post-api/default
    @PostMapping(value = "/default")
    public String postMethod() {
        return "Hello World!";
    }

    // http://localhost:8080/api/v1/post-api/member
    @PostMapping(value = "/member")
    public String postMember(@RequestBody Map<String, Object> postData) {
        StringBuilder sb = new StringBuilder();

        postData.entrySet().forEach(map -> {
            sb.append(map.getKey() + " : " + map.getValue() + "\n");
        });

    /*
    param.forEach((key, value) -> sb.append(key).append(" : ").append(value).append("\n"));
     */

        return sb.toString();
    }

    // http://localhost:8080/api/v1/post-api/member2
    @PostMapping(value = "/member2")
    public String postMemberDto(@RequestBody MemberDTO memberDTO) {
        return memberDTO.toString();
    }

}
```

### PUT API

- 해당 리소스가 존재하면 갱신하고, 리소스가 없을 경우에는 새로 생성해주는 API
- 업데이트를 위한 메소드

```java
package com.example.demo.controller;

import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.MemberDTO;

@RestController
@RequestMapping(value = "/api/v1/put-api", method = RequestMethod.PUT)
public class PutController {

    // http://localhost:8080/api/v1/put-api/default
    @PutMapping(value = "/default")
    public String putMethod() {
        return "Hello World!";
    }

    // http://localhost:8080/api/v1/put-api/member
    @PutMapping(value = "/member")
    public String postMember(@RequestBody Map<String, Object> putData) {
        StringBuilder sb = new StringBuilder();

        putData.entrySet().forEach(map -> {
            sb.append(map.getKey() + " : " + map.getValue() + "\n");
        });

    /*
    param.forEach((key, value) -> sb.append(key).append(" : ").append(value).append("\n"));
     */

        return sb.toString();
    }

// 아래 세 경우의 차이!!

    // http://localhost:8080/api/v1/put-api/member2
    @PutMapping(value = "/member1")
    public String postMemberDto1(@RequestBody MemberDTO memberDTO) {
        return memberDTO.toString();
    }

**// 이거는 toString 이 아니라 json 으로 간다 => 클라이언트에게 더 편함!!**
    // http://localhost:8080/api/v1/put-api/member2
    @PutMapping(value = "/member2")
    public MemberDTO postMemberDto2(@RequestBody MemberDTO memberDTO) {
        return memberDTO;
    }

**// 202 코드로 response 됨 => 원하는대로 더 사용할 수 있음**
    // http://localhost:8080/api/v1/put-api/member2
    @PutMapping(value = "/member3")
    public ResponseEntity<MemberDTO> postMemberDto3(@RequestBody MemberDTO memberDTO) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(memberDTO);
    }

}
```

### DELETE API

- 서버를 통해 리소스를 삭제 하기 위해 사용되는 API
- 일반적으로 @PathVariable을 통해 리소스 id등을 받아 처리

```java
package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/get-api", method = RequestMethod.DELETE)
public class DeleteController {

    // http://localhost:8080/api/v1/get-api/variable1/{String 값}
    @DeleteMapping(value = "/delete/{variable}")
    public String DeleteVariable(@PathVariable String variable) {
        return variable;
    }

}
```

### ResponseEntity ⇒ status 상세하게 수정

- httpEntity라는 클래스를 상속 받아 사용하는 클래스
- 사용자의 httprequest에 대한 응답 데이터를포함
- 포함하는 클래스
  - httpstatus
  - httpheaders
  - httpbody
