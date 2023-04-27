module.exports = {
  apps: [
    {
      script: "./app.js",
      instances: 4,
      exec_mode: "cluster",
    },
  ],
};
//exec_mode에 cluster을 입력하여, nodejs의 단점인 싱글스레드를 멀티프로세스로 동작하도록 해줌
