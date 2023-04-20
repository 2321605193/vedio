<template>
  <div>
    <button @click="startRecording">开始录音</button>
    <button @click="stopRecording">停止录音</button>
    <button @click="uploadRecording">上传录音</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaStream: null,
      mediaRecorder: null,
      audioChunks: [],
    };
  },
  mounted() {
    // 在组件加载完毕后引入 navigator.mediaDevices
    navigator.mediaDevices = navigator.mediaDevices || {};
  },
  methods: {
    startRecording() {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaStream = stream;
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.addEventListener("dataavailable", (event) => {
            if (event.data.size > 0) {
              this.audioChunks.push(event.data);
            }
          });
          this.mediaRecorder.start();
        })
        .catch((error) => {
          console.error("无法访问麦克风", error);
        });
    },
    stopRecording() {
      if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
        this.mediaRecorder.stop();
        this.mediaStream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    },
    uploadRecording() {
      // 同前面的示例代码
    },
  },
};
</script>
