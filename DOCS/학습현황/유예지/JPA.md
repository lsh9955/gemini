# 학습 내역을 기록합니다.

## ORM

객체 관계 매핑
객체는 객체대로 설계
관계형 데이터 베이스는 관계형 데이터 베이스 대로 설계
ORM 프레임 워크가 중간에서 매핑

연관관계에 따라 다라짐
지연 로딩은 member 조회 시 team이 거의 필요 없을 때 ⇒ 팀이 사용될 때만 추가해줌
즉시 로딩은 member 조회 시 team이 거의 같이 쓴다 ⇒ 계속 같이 불러와줌
지연로딩으로 코딩하다 나중에 즉시 로딩인 것끼리 묶어주면 좋음
ORM은 객체와 RDB 두 기둥 위에 있는 기술 ⇒ 두 개를 다 알고 고민 해봐야 함

### JPQL

가장 단순한 조회 방법

```java
package hellojpa;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.util.List;

public class JpaMain {
    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("hello");

        EntityManager entityManager = emf.createEntityManager();
        EntityTransaction entityTransaction = entityManager.getTransaction();
        entityTransaction.begin();

        // 여기서 코드 작성
        try {
//            Member member = new Member();
//
//            member.setId(1L);
//            member.setName("helloA");
//            Member findMember = entityManager.find(Member.class, 1L);
//            findMember.setName("helloJPA");
            //전체 회원 조회
            //객체를 대상으로 쿼리
            List<Member> result = entityManager.createQuery("select m from Member as m", Member.class).setFirstResult(5).setMaxResults(8).getResultList();

            for (Member member : result) {
                System.out.println("member.name =" + member.getName());
            }

            // 멤버 저장
//            entityManager.persist(member);
            entityTransaction.commit();
        } catch (Exception e) {
            entityTransaction.rollback();
        } finally {
            // 중요!! 사용하면 꼭 닫아주어야 함
            entityManager.close();
        }

        emf.close();
    }
}
```

## 영속성 컨텍스트

JPA에서 가장 중요한 두가지

- 객체와 관계형 데이터베이스 매핑하기 > 설계 관련된
- **영속성 컨텍스트** > 진짜 jpa가 내부에서 어떻게 동작해?

### 영속성 컨텍스트란?

엔티티를 영구 저장하는 환경! jpa를 이해하는 데 가장 중요한 용어

**EntityManager.persist(entity); → 엔티티를 영속성 컨텍스트에 저장**

영속성 컨텍스트는 논리적인 개념, 눈에 보이지 않음

엔티티 매니저를 통해서 영속성 컨텍스트에 접근

### 엔티티의 생명주기

- 비영속(new/transient) : 영속성 컨텍스트와 전혀 관계가 없는 새로운 상태

```java
Member member = new Member();
member.setId("member1");
member.setUsername("회원1");
```

- 영속(managed) : 영속성 컨텍스트에 관리되는 상태
  아래와 같이 코드를 치면 member가 영속 컨텍스트에 들어가서 영속 상태가 된다

### 영속성 컨텍스트의 이점

- 1차 캐시 ⇒ 영속성 컨텍스트는 내부에서 1차 캐시를 들고 있음
  어떤 것을 조회할 때 1차 캐시에서 찾음
  1차 캐시에서 없을 때 DB를 조회하고 1차 캐시에 저장하고 반환한다
  만약에 1차 캐시에 있다면 DB 조회를 하지 않는다
  근데 또 한번 사용하면 바로 캐시를 버리기 때문에 막 성능의 이점은 없음, 비즈니스 로직이 복잡하면 도움 될지도?

- 동일성(identity) 보장
  1차 캐시로 반복 가능한 읽기 등급의 트랜잭션 격리 수준을 데이터 베이스가 아닌 애플리케이션 차원에서 제공 (== 비교를 보장한다)
  ```java
  Member a = em.find(Member.class, "member1");
  Member b = em.find(Member.class, "member1");
  a == b // true
  ```
- 트랜잭션을 지원하는 쓰기 지연
  커밋 하는 순간 데이터베이스에 INSERT SQL을 보낸다
  왜?? commit 하는 순간 보내면 최적화 할 여지가 생김 ⇒ 하이버네이트에는 batch.size가 있는데 데이터베이스를 모아서 한번에 DB에 넣어줌

- 변경 감지
  찾아온 다음에 변경하고 persist에 저장하지 않는다
  왜? 커밋을 하는 순간 엔티티와 스냅샷 비교(스냅샷은 최초로 영속 컨택스트에 진입한 시점)
  변경이 감지되면 sql update 쿼리를 만들어서 그걸 플러시 하고 그 다음 커밋하기 때문에

+) 플러시는 뭐야? 영속성 컨텍스트의 변경내용을 데이터베이스에 반영

영속성 컨텍스트의 변경 사항과 DB를 맞춤 ⇒ DB에 쫙 날려줌

변경 감지, 수정된 엔티티 쓰기 지연 SQL 저장소에 등록

쓰기 지연 SQL저장소의 쿼리를 데이터베이스에 전송(등록, 수정, 삭제 쿼리)

플러시를 하면 1차 캐시가 사라지지 않음 ⇒ flush를 하면 1차 캐시와 다르게 바뀐 것들이 DB에 반영됨

영속성 컨텍스트를 플러시하는 방법은?

```java
em.flush() => 직접 호출
트랜잭션 커밋 - 플러시 자동 호출
JPQL 쿼리 실행 - 플러시 자동 호출

Member member = new Member(200L, "member 200");
em.persist(member);
em.flush();

```

JPA는 기본 모드가 플러시가 자동으로 호출됨

```java
em.setFlushMode(FlushModeType.COMMIT)
FlushModeType.AUTO => 커밋이나 쿼리를 실행할 때 플러시 (기본값) => 그냥 auto로 써라
FlushModeType.COMMIT => 커밋할 때만 플러시
```

플러시는!

- 영속성 컨텍스트를 비우지 않음
- 영속성 컨텍스트의 변경 내용을 데이터 베이스에 동기화
- 트랜잭션이라는 작업 단위가 중요 ⇒ 커밋 직전에만 동기화 하면 됨 ⇒ 트랜잭션과 영속성이 같이 동기화 되어야 함!

++ 준영속 상태

영속 ⇒ 준영속

1차 캐시에 올라간 상태가 영속 상태

영속 상태의 엔티티가 영속성 컨텍스트에서 분리(detached)

영속성 컨텍스트가 제공하는 기능을 사용 못함

```java
em.detach(member); => 영속성 컨텍스트에서 더이상 관리하지마
em.clear() => 영속성 컨텍스트를 완전히 초기화
em.close() => 영속성 컨텍스트를 종료
```

- 지연 로딩

## 엔티티 매핑

### 엔티티 매핑 소개

- 객체와 테이블 매핑: @Entity, @Table
- 필드와 컬럼 매핑: @Column
- 기본 키 매핑: @Id
- 연관관계 매핑: @ManyToOne, @JoinColumn

### 객체와 테이블 매핑

- @Entity : JPA가 관리하는 엔티티, JPA를 사용해서 테이블과 매핑할 클래스는 Entity가 필수
  - JPA에서 사용할 엔티티 이름을 지정한다.
  - 기본값: 클래스 이름을 그대로 사용(Member)
  - 같은 클래스 이름이 없으면 가급적 기본값을 사용한다.
- 기본 생성자 필수(파라미터가 없는 public 또는 protected 생성자)
- final 클래스, enum, interface, inner 클래스 사용은 안됨
- 저장할 필드에 final 사용하면 안됨
- @Table(name = “MBR”)

### DDL 생성 기능

- 제약 조건 추가
  - @Column(nullable = false) unique 조건 등은 DDL 생성에만 영향 줌

## 필드와 컬럼 매핑

### 매핑 어노테이션 정리

```java
hibernate.hbm2ddl.auto

@Column 컬럼 매핑
@Temporal 날짜 타입 매핑
@Enumerated
enum 타입 매핑
@Lob BLOB, CLOB 매핑
@Transient 특정 필드를 컬럼에 매핑하지 않음(매핑 무시)

@Id
private Long id;

// 컬럼명은 name 이라고 지정
@Column(name = "name")
private String username;
private Integer age;

//enum 타입이 쓰고 싶어 > enumerated를 쓴다
@Enumerated(EnumType.STRING)
private RoleType roleType;

// 날짜 타입 (timestamp > 날짜와 시간 모두)
@Temporal(TemporalType.TIMESTAMP)
private Date createdDate;
@Temporal(TemporalType.TIMESTAMP)
private Date lastModifiedDate;

// 뭔가 큰 컨텐츠를 넣고 싶을 때
@Lob
private String description;
```

### Column

| 속성 | 설명                             | 기본값           |
| ---- | -------------------------------- | ---------------- |
| name | 필드와 매핑할 테이블의 컬럼 이름 | 객체의 필드 이름 |

| insertable,(등록)
updatable(변경) | 등록, 변경 가능 여부 | TRUE / false 하면 절대 업데이트 되지 않음 |
| nullable(DDL) | null 값의 허용 여부를 설정한다. false로 설정하면 DDL 생성 시에
not null 제약조건이 붙는다. | 기본 TRUE / false 하면 not null 제약 조건에 걸림 |
| unique(DDL) | @Table의 uniqueConstraints와 같지만 한 컬럼에 간단히 유니크 제
약조건을 걸 때 사용한다. 이 방식 보다는 @Table(uniqueConstraints = ~) 이 형식을 더 많이 쓴다. | |
| columnDefinition
(DDL) | 데이터베이스 컬럼 정보를 직접 줄 수 있다.
ex) varchar(100) default ‘EMPTY’ | 필드의 자바 타입과
방언 정보를 사용해 |
| length(DDL) | 문자 길이 제약조건, String 타입에만 사용한다. | 255 |
| precision,
scale(DDL) | BigDecimal 타입에서 사용한다(BigInteger도 사용할 수 있다).
precision은 소수점을 포함한 전체 자 릿수를, scale은 소수의 자릿수
다. 참고로 double, float 타입에는 적용되지 않는다. 아주 큰 숫자나
정 밀한 소수를 다루어야 할 때만 사용한다. | precision=19,
scale=2 |

### Enumerated

• EnumType.ORDINAL: enum 순서를 데이터베이스에 저장 > 운영 상 별로 좋지 않음
• EnumType.STRING: enum 이름을 데이터베이스에 저장 > 꼭 string으로 하기!!

### Temporal

지금은 딱히 필요가 없음

참고: LocalDate, LocalDateTime을 사용할 때는 생략 가능(최신 하이버네이트 지원)

최신을 쓰면 그냥 이렇게 넣기 temporal 말고

```java
private LocalDate testLocalDate;
private LocalDateTime testLocalDateTime;
```

### Lob

데이터베이스 BLOB, CLOB 타입과 매핑
• @Lob에는 지정할 수 있는 속성이 없다.
• 매핑하는 필드 타입이 문자면 CLOB 매핑, 나머지는 BLOB 매핑
• CLOB: String, char[], java.sql.CLOB
• BLOB: byte[], java.sql. BLOB

### Transient

필드 매핑X
• 데이터베이스에 저장X, 조회X
• 주로 메모리상에서만 임시로 어떤 값을 보관하고 싶을 때 사용
• @Transient
private Integer temp;

## 기본 키 매핑

### 기본 키 매핑 어노테이션

• @Id
• @GeneratedValue

```java
@Id @GeneratedValue(strategy = GenerationType.AUTO)
private Long id;
```

### 기본 키 매핑 방법

• 직접 할당: @Id만 사용
• 자동 생성(@GeneratedValue)
• IDENTITY: 데이터베이스에 위임, MYSQL

• **기본 키 생성을 데이터베이스에 위임**
• 주로 MySQL, PostgreSQL, SQL Server, DB2에서 사용
(예: MySQL의 AUTO* INCREMENT)
• JPA는 보통 트랜잭션 커밋 시점에 INSERT SQL 실행
• \*\*AUTO* INCREMENT는 데이터베이스에 INSERT SQL을 실행한 이후에 ID 값을 알 수 있음 > 다른 것들은 commit 하면 id를 알 수 있다.\*\*
• IDENTITY 전략은 em.persist() 시점에 즉시 INSERT SQL 실행하고 DB에서 식별자를 조회

- identity에 애매한 점은?

영속성 관리가 애매해진다(아이디가 없으니깐) > 그래서 persist 해야 id를 알 수 있다.

```java
@Entity
public class Member {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

• SEQUENCE: 데이터베이스 시퀀스 오브젝트 사용, ORACLE

• @SequenceGenerator 필요

•데이터베이스 시퀀스는 유일한 값을 순서대로 생성하는 특별한
•데이터베이스 오브젝트(예: 오라클 시퀀스)
• 오라클, PostgreSQL, DB2, H2 데이터베이스에서 사용

```java
속성 설명 기본값
name 식별자 생성기 이름 필수
sequenceName 데이터베이스에 등록되어 있는 시퀀스 이름 hibernate_sequence
initialValue DDL 생성 시에만 사용됨, 시퀀스 DDL을 생성할 때 처음 1 시작하는
수를 지정한다. 1
allocationSize 시퀀스 한 번 호출에 증가하는 수(성능 최적화에 사용됨
**데이터베이스 시퀀스 값이 하나씩 증가하도록 설정되어 있으면 이 값
을 반드시 1로 설정해야 한다**
50
catalog, schema 데이터베이스 catalog, schema 이름
```

```java
@Entity
@SequenceGenerator(
name = “MEMBER_SEQ_GENERATOR",
sequenceName = “MEMBER_SEQ", //매핑할 데이터베이스 시퀀스 이름
initialValue = 1, allocationSize = 50)
// DB에 미리 50개를 세팅해 놓는 것임 > DB에 미리 메모리 공간을 확보함 > 동시성 없이 다양한 문제 해결
// 1개, 51개 호출 > 여기 메모리에서 가져다 쓰다가 다 쓰는 순간 다시 DB에서 콜함
// 너무 많이 잡으면 구멍이 생기니 50~100이 적절
// 미리 값을 올려두는 방식 > 테이블 전략도 같다.
public class Member {
@Id
@GeneratedValue(strategy = GenerationType.SEQUENCE,
generator = "MEMBER_SEQ_GENERATOR")
private Long id;
```

• TABLE: 키 생성용 테이블 사용, 모든 DB에서 사용 > 잘 쓰지 않는다

• @TableGenerator 필요

- 키 생성 전용 테이블을 하나 만들어서 데이터베이스 시퀀스를 흉내 내는 전략
  • 장점: 모든 데이터베이스에 적용 가능
  • 단점: 성능

```java
@Entity
@TableGenerator(
        name = "MEMBER_SEQ_GENERATOR",
        table = "MY_SEQUENCES",
        pkColumnValue = "MEMBER_SEQ", allocationSize = 1)
public class Member {
        @Id
        @GeneratedValue(strategy = GenerationType.TABLE,
                generator = "MEMBER_SEQ_GENERATOR")
    private Long id;
```

### 그러면 권장하는 식별자 전략은?

- **기본 키 제약 조건: null 아님, 유일, 변하면 안된다 >> 이게 기본!!**
  - 여기서 변하면 안된다가 정말 어려움
- 미래까지 이 조건을 만족하는 자연키를 찾기 어렵다. 대리기(대체키)를 사용하자
  - 자연키: 비즈니스 적으로 의미 있는 키 ex) 전화번호, 주민번호
  - 그래서 비즈니스 적으로 의미 없는 키를 사용해라
- 예를들어 주민등록번호도 기본 키로 적절하지 않다.
- **권장: Long 형 + 대체키(ex) seq, userid) + 키 생성 전략 사용!**

## 연관관계 매핑 기초

### 단방향 연관관계

- 객체와 테이블 연관관계의 차이를 이해
- 객체의 참조와 테이블의 외래 키를 매핑
- 용어 이해
  - 방향: 단방향, 양방향
  - 다중성: 다대일, 일대다, 일대일, 다대다 이해
  - **연관관계의 주인: 객체 양방향 연관관계는 관리 주인이 필요 > 정말 어려움**

### 연관관계가 필요한 이유

객체를 테이블에 맞추어 데이터 중심으로 모델링하면, 협력 관계를 만들 수 없다.
• 테이블은 외래 키로 조인을 사용해서 연관된 테이블을 찾는다.
• 객체는 참조를 사용해서 연관된 객체를 찾는다.
• 테이블과 객체 사이에는 이런 큰 간격이 있다

```java
// 정말 객체지향스럽지 않음
            Member findMember = entityManager.find(Member.class, member.getId());
            Long findTeamId = findMember.getTeamId()
```

이렇게 찾는 것이 정말 불편함

### 단방향 연관관계

```java
// member가 many team이 one, joincolumn은 fk
    @ManyToOne
    @JoinColumn(name = "TEAM_ID")
    private Team team;

member.setTeam(team); 만 해도 다 불러옴
Member findMember = entityManager.find(Member.class, member.getId());
Team findTeam = findMember.getTeam();
```

### 양방향 연관관계와 연관관계의 주인 (매우중요!!)

```java
		@OneToMany(mappedBy = "team")
    private List<Member> members = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Member> getMembers() {
        return members;
    }

    public void setMembers(List<Member> members) {
        this.members = members;
    }

Team team = new Team();
team.setName("TeamA");
entityManager.persist(team);

Member member = new Member();
member.setUsername("member1");
member.setTeam(team);
entityManager.persist(member);

Member findMember = entityManager.find(Member.class, member.getId());
List<Member> members = findMember.getTeam().getMembers();

entityTransaction.commit();ㅡㅁ
```

### mappedby

- 객체와 테이블이 관계를 맺는 차이
  - 객체 연관관계 = 2개
    회원 -> 팀 연관관계 1개(단방향)
    팀 -> 회원 연관관계 1개(단방향)
  - 테이블 연관관계 = 1개
    • 회원 <-> 팀의 연관관계 1개(양방향) - FK 하나로 연관관계가 끝이 남 객체 세상은 더 어지러워서 양방향임
    ⇒ 객체의 양방향 관계는 사실 양방향 관계가 아니라 서로 다른 단방향 관계 2개다.
    ⇒ 테이블은 외래 키 하나로 두 테이블의 연관관계를 관리

MEMBER.TEAM_ID 외래 키 하나로 양방향 연관관계 가짐
(양쪽으로 조인할 수 있다.)

```sql
SELECT *
FROM MEMBER M
JOIN TEAM T ON M.TEAM_ID = T.TEAM_ID
SELECT *
FROM TEAM T
JOIN MEMBER M ON T.TEAM_ID = M.TEAM_ID
```

이러면 외래키를 어떻게 관리하지?

**연관관계의 주인**으로 관리하자!

- 객체의 두 관계 중 하나를 연관관계의 주인으로 지정
- **연관관계의 주인만이 외래 키를 관리(등록, 수정)**
- **주인이 아닌 쪽은 읽기만 가능**
- 주인은 maddepBy 속성 사용 X
- 주인이 아니면 mappedBy 속성으로 주인 지정

그럼 누굴 주인으로 하지? **외래키가 있는 곳이 주인**이야!

1쪽에 mappedby를 걸자

외래키가 있는 곳이 무조건 N이다.

자동차가 중요하긴 한데, 자동차 바퀴를 주인으로 잡는거지

### 양방향 매핑 시 가장 많이 하는 실수

- 연관관계의 주인에 값을 입력하지 않음
  - mappedby는 읽기 전용이다 업데이트 할 수 없음 ⇒ 그러니깐 뭔가를 추가하지 말자
  ```sql
  Team team = new Team();
  team.setName("TeamA");
  em.persist(team);
  Member member = new Member();
  member.setName("member1");
  //역방향(주인이 아닌 방향)만 연관관계 설정
  team.getMembers().add(member);
  em.persist(member);
  ```

⇒ 양방향 연관관계면 양쪽에 값을 다 세팅해야 하는 것이 맞음

양방향 연관관계 주의 - 실습
• 순수 객체 상태를 고려해서 항상 양쪽에 값을 설정하자
• 연관관계 편의 메소드를 생성하자

```java
public void setTeam(Team team) {
        this.team = team;
        team.getMembers().add(this);
    }
```

• **양방향 매핑시에 무한 루프를 조심**하자
• 예: toString(), lombok, JSON 생성 라이브러리

**컨트롤러에서 엔티티 반환하지 말기**

### 양방향 매핑 정리

- **단방향 매핑만으로도 이미 연관관계 매핑은 완료**
- 양방향 매핑은 반대 방향으로 조회 기능이 추가된 것 뿐
- JPQL에서 역방향으로 탐색할 일이 많음
- 단방향 매핑을 잘 하고 양방향은 필요할 때 추가해도 됨

## 다양한 연관관계

### 연관관계 매핑 시 고려사항

- 다중성 ⇒ 데이터베이스 관점
  - 다대일, 일대다, 일대일, 다대다 ⇒ 다대다는 실무에서 쓰면 안됨
- 단방향, 양방향
  - 테이블
    - 외래 키 하나로 양쪽 조인 가능
    - 방향이라는 개념 없음
  - 객체
    - 참조용 필드가 있는 쪽으로만 참조 가능
    - 한쪽만 참조하면 단방향
    - 양쪽이 서로 참조하면 양방향
- 연관관계 주인
  - 테이블은 외래 키 하나로 두 테이블이 연관관계를 맺음
  - 객체 양방향 관계는 참조가 두군데
  - 객체 양방향 관계는 참조가 두군데 있음 ⇒ 외래키 관리할 곳을 지정
  - 주인: 외래키를 관리하는 참조
  - 반대편: 외래키에 영향 주지 않고, 단순 조회

### 다대일(N:1)

다에 외래키가 가야함!!!

가장 많이 사용한다!!

**단방향**

```java
// member가 many team이 one, joincolumn은 fk => 단방향
    @ManyToOne
    @JoinColumn(name = "TEAM_ID")
    private Team team;
```

**양방향**

객체에서 추가만 하면 됨 ⇒ 어차피 읽기만 할거니깐

```java
@OneToMany(mappedBy = "team")
    private List<Member> members = new ArrayList<>();

team에 이걸 넣어서 연결
```

다대일 양방향 정리
• 외래 키가 있는 쪽이 연관관계의 주인
• 양쪽을 서로 참조하도록 개발

### 일대다

일이 연관관계의 주인 ⇒ 거의 안씀

### 일대일

- 주 테이블이나 대상 테이블 중에 외래 키 선택 가능
- 외래 키에 데이트베이스 유니크(UNI) 제약조건 추가

회원 한 명이 하나의 라커룸을 가지고 있다고 가정

둘 다 일대일이라 어디에 외래키를 넣어도 상관이 없다 ⇒ 그래도 외래키가 있는 곳이 주인!!

다대일 단방향과 거의 유사

아래와 같이 하면 양방향이 됨 ⇒ 똑같이 mappedby를 한다

```java
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Locker {

    @Id @GeneratedValue
    private Long Id;

    private String name;

    @OneToOne(mappedBy = "locker")
    private Member member;

}
```

일대일 관계일 때 대상 테이블에 외래 키가 있는 단방향도 있다. ⇒ 사실 없다 지원하지 않음, 양방향 관계에서 지원이 된다?? ⇒ 그니깐 각자 자신의 외래키를 관리한다? 는 느낌 양방향은 원래의 단방향을 뒤집은 거와 같다.

멤버가 라커를 가지고 있는 것이 좋음 ⇒ 멤버가 조회를 많이 하니깐 ⇒ 멤버롤 조회 했을 때 라커가 있는 지 없는 지 굉장히 쉽게 조회 가능

일대일 정리

**주 테이블에 외래 키 ⇒ 실무에서는 이것을 많이 쓰는데 DB와 합의 봐야 함**
• 주 객체가 대상 객체의 참조를 가지는 것처럼 주 테이블에 외래 키를 두고 대상 테이블을 찾음
• 객체지향 개발자 선호
• JPA 매핑 편리
• 장점: 주 테이블만 조회해도 대상 테이블에 데이터가 있는지 확인 가능
• 단점: 값이 없으면 외래 키에 null 허용

대상 테이블에 외래 키
• 대상 테이블에 외래 키가 존재
• 전통적인 데이터베이스 개발자 선호
• 장점: 주 테이블과 대상 테이블을 일대일에서 일대다 관계로 변경할 때 테이블 구조 유지
• 단점: 프록시 기능의 한계로 지연 로딩으로 설정해도 항상 즉시 로딩됨(프록시는 뒤에서 설명)

### 다대다

관계형 데이터베이스는 정규화된 테이블 2개로 다대다 관계를 표현할 수 없음
연결 테이블을 추가해서 일대다, 다대일 관계로 풀어내야함

객체는 또 다대다가 됨

member에 이걸 넣음 ⇒ 하지만 한계가 커서 쓰지 않음
중간 테이블에 추가 정보를 넣는 것이 불가능함

```java
@ManyToMany
@JoinTable(name = "MEMBER_PRODUCT")
private List<Product> products = new ArrayList<>();
```

**다대다 한계 극복**

- 연결 테이블용 엔티티 추가(연결 테이블을 엔티티로 승격)
- ManyToMany ⇒ OneToMany, ManyToOne 로 풀기

영한쓰는 이렇게 씀 ⇒ 비즈니스 적으로 의미가 없는 것을 사용 ⇒ 그래서 승격된 엔티티에서 의미 없는 값이 id가 되어버림 ⇒ 모든 db에 generatevalue를 깔아줌

### JoinColumn

- **외래 키를 매핑할 때 사용**

targetentity는 몰라도 됨

다대일에는 mappedby가 없음 왜냐면 다는 무조건 주인이니깐!!

## 고급 매핑

## 상속관계 매핑

- 관계형 데이터베이스는 상속 관계가 없음
- 슈퍼타입 서브타입 관계라는 모델링 기법이 객체 상속과 유사
- 상속관계 매핑: 객체의 상속과 구조와 DB의 슈퍼타입 서브타입 관계를 매핑

### 조인 전략(이 기본이다)

- 각각 테이블로 변환
- inheritance
- 조인 전략의 장점은 테이블 정규화가 되어 있어서 좋다!! 장점이 많음
- 외래 키 참조 무결성 제약 조건 활용 가능
- 저장 공간 효율화

```java
package hellojpa;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@DiscriminatorColumn // dtype이 생김
public class Item {

    @Id @GeneratedValue
    private Long Id;

    private String name;
    private int price;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}
```

### 단일 테이블 전략

- inheritance 뒤에만 바꿔주면 됨
- 그리고 discriminatorcolumn이 없어도 dytpe이 생김 ⇒ 뭔지가 알 수 없으니 필수로 생김

```java
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
```

### 구현 클래스마다 테이블 전략 ⇒ 쓰면 안됨

```java
public absrtact class Item 으로 하면 됨
```

조인 전략이 기본이되, 정말 단순하면 단일 테이블 전략을 사용한다

## MappedSuperclass - 매핑 정보 상속

- **공통 매핑 정보가 필요할 때 사용(id, name)**
- 테이블과 관계 없고, 단순히 엔티티가 공통으로 사용하는 매핑 정보를 모으는 역할
- 주로 등록일, 수정일, 등록자, 수정자 같은 전체 엔티티에서 공통으로 적용하는 정보를 모을 때 사용
- 참고: @Entity 클래스는 엔티티나 @MappedSuperclass로 지정한 클래스만 상속 가능

속성만 사용하고 싶을 때 ⇒ db는 다르지만 객체에서는 상속하고 싶을 때

아래와 같이 깔고 시작하면 좋음

- 상속관계 매핑과 다름
- 엔티티가 아니고 테이블과 매핑하지 않는다
- 부모 클래스를 상속 받는 자식 클래스에 매핑 정보만 제공
- 조회, 검색 불가(em.find(BaseEntity) 불가)
- 직접 생성해서 사용할 일이 없으니 추상 클래스 권장 ⇒ 단독으로 저장할 일이 없으면 abstract를 붙인다!!

```java
package hellojpa;

import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

@MappedSuperclass
public abstract class BaseEntity {
    private String createdBy;
    private LocalDateTime createdDate;
    private String lastModifiedBy;
    private LocalDateTime lastModifiedDate;

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    public void setLastModifiedBy(String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    public LocalDateTime getLastModifiedDate() {
        return lastModifiedDate;
    }

    public void setLastModifiedDate(LocalDateTime lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }
}
```
