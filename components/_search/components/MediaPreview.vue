<template>
  <div class="media-preview" :class="{ 'loading': !mediaLoaded }">
    <!-- 图片预览 -->
    <div v-if="mediaType === 'image'" class="image-preview">
      <img
        :src="url"
        :alt="name"
        class="media-image"
        @load="onMediaLoad"
        @error="onMediaError"
        :class="{ 'loaded': mediaLoaded }"
      />
    </div>

    <!-- 视频预览 -->
    <div v-else-if="mediaType === 'video'" class="video-preview">
      <video
        :src="url"
        class="media-video"
        preload="metadata"
        @loadedmetadata="onMediaLoad"
        @error="onMediaError"
        @play="onVideoPlay"
        @pause="onVideoPause"
        @ended="onVideoEnded"
        @canplay="onVideoCanPlay"
        :class="{ 'loaded': mediaLoaded }"
        @click.stop="toggleVideoPlay"
        ref="videoRef"
        muted
        playsinline
      >
        <source :src="url" :type="getVideoMimeType()">
        您的浏览器不支持视频播放
      </video>
      
      <!-- 视频播放控制 -->
      <div class="video-controls" :class="{ 'hidden': !mediaLoaded }" @click.stop>
        <button 
          class="play-button"
          @click.stop="toggleVideoPlay"
          :class="{ 'playing': isPlaying }"
        >
          <v-icon>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
        </button>
        
        <!-- 视频时长 -->
        <div v-if="duration" class="video-duration">
          {{ formatDuration(duration) }}
        </div>
      </div>
    </div>

    <!-- 音频预览 -->
    <div v-else-if="mediaType === 'audio'" class="audio-preview">
      <div class="audio-visualizer">
        <div class="audio-waveform">
          <div 
            v-for="i in 20" 
            :key="i" 
            class="wave-bar"
            :style="{ height: getRandomHeight() + '%' }"
          ></div>
        </div>
      </div>
      
      <audio
        :src="url"
        class="media-audio"
        preload="metadata"
        @loadedmetadata="onMediaLoad"
        @error="onMediaError"
        @timeupdate="onTimeUpdate"
        @ended="onAudioEnded"
        ref="audioRef"
      >
        <source :src="url" :type="getAudioMimeType()">
        您的浏览器不支持音频播放
      </audio>
      
      <!-- 音频控制 -->
      <div class="audio-controls" :class="{ 'hidden': !mediaLoaded }" @click.stop>
        <button 
          class="play-button"
          @click.stop="toggleAudioPlay"
          :class="{ 'playing': isPlaying }"
        >
          <v-icon>{{ isPlaying ? 'mdi-pause' : 'mdi-play' }}</v-icon>
        </button>
        
        <!-- 进度条 -->
        <div class="progress-container">
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
        </div>
        
        <!-- 时间显示 -->
        <div class="time-display">
          <span>{{ formatTime(currentTime) }}</span>
          <span>/</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>
    </div>

    <!-- 文档预览 -->
    <div v-else-if="mediaType === 'document'" class="document-preview">
      <div class="document-icon">
        <v-icon size="48" :color="getDocumentColor()">
          {{ getDocumentIcon() }}
        </v-icon>
      </div>
      <div class="document-info">
        <div class="document-name">{{ name }}</div>
        <div class="document-format">{{ format.toUpperCase() }}</div>
      </div>
    </div>

    <!-- 未知格式 -->
    <div v-else class="unknown-preview">
      <div class="unknown-icon">
        <v-icon size="48" color="grey">mdi-file-question</v-icon>
      </div>
      <div class="unknown-info">
        <div class="unknown-name">{{ name }}</div>
        <div class="unknown-format">{{ format.toUpperCase() }}</div>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="!mediaLoaded" class="media-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">加载中...</div>
    </div>

    <!-- 错误状态 -->
    <div v-if="hasError" class="media-error">
      <v-icon size="48" color="error">mdi-alert-circle</v-icon>
      <div class="error-text">加载失败</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Props {
  url: string
  name: string
  format: string
  type?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  load: [event: Event]
  error: [event: Event]
  play: []
  pause: []
}>()

// 媒体状态
const mediaLoaded = ref(false)
const hasError = ref(false)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)

// 媒体引用
const videoRef = ref<HTMLVideoElement>()
const audioRef = ref<HTMLAudioElement>()

// 计算媒体类型
const mediaType = computed(() => {
  if (props.type) {
    return props.type
  }
  
  const format = props.format.toLowerCase()
  
  // 图片格式
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'].includes(format)) {
    return 'image'
  }
  
  // 视频格式
  if (['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv', 'm4v'].includes(format)) {
    return 'video'
  }
  
  // 音频格式
  if (['mp3', 'wav', 'flac', 'aac', 'ogg', 'wma', 'm4a'].includes(format)) {
    return 'audio'
  }
  
  // 文档格式
  if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'ppt', 'pptx', 'xls', 'xlsx'].includes(format)) {
    return 'document'
  }
  
  return 'unknown'
})

// 计算进度百分比
const progressPercentage = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

// 媒体加载成功
const onMediaLoad = (event: Event) => {
  mediaLoaded.value = true
  hasError.value = false
  
  console.log('媒体加载成功:', mediaType.value)
  
  if (mediaType.value === 'video' && videoRef.value) {
    duration.value = videoRef.value.duration
    console.log('视频时长:', duration.value)
  } else if (mediaType.value === 'audio' && audioRef.value) {
    duration.value = audioRef.value.duration
    console.log('音频时长:', duration.value)
  }
  
  emit('load', event)
}

// 媒体加载失败
const onMediaError = (event: Event) => {
  hasError.value = true
  mediaLoaded.value = false
  console.error('媒体加载失败:', event)
  emit('error', event)
}

// 视频播放控制
const toggleVideoPlay = async () => {
  if (!videoRef.value) {
    console.warn('视频元素未找到')
    return
  }
  
  try {
    if (isPlaying.value) {
      videoRef.value.pause()
      isPlaying.value = false
      emit('pause')
    } else {
      // 确保视频已加载
      if (videoRef.value.readyState < 2) {
        console.log('视频尚未加载完成，等待加载...')
        return
      }
      
      await videoRef.value.play()
      isPlaying.value = true
      emit('play')
    }
  } catch (error) {
    console.error('视频播放失败:', error)
    hasError.value = true
  }
}

// 音频播放控制
const toggleAudioPlay = () => {
  if (!audioRef.value) return
  
  if (isPlaying.value) {
    audioRef.value.pause()
    isPlaying.value = false
    emit('pause')
  } else {
    audioRef.value.play()
    isPlaying.value = true
    emit('play')
  }
}

// 音频时间更新
const onTimeUpdate = () => {
  if (audioRef.value) {
    currentTime.value = audioRef.value.currentTime
  }
}

// 音频播放结束
const onAudioEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
  emit('pause')
}

// 视频播放事件
const onVideoPlay = () => {
  isPlaying.value = true
  emit('play')
}

// 视频暂停事件
const onVideoPause = () => {
  isPlaying.value = false
  emit('pause')
}

// 视频结束事件
const onVideoEnded = () => {
  isPlaying.value = false
  currentTime.value = 0
  emit('pause')
}

// 视频可以播放事件
const onVideoCanPlay = () => {
  console.log('视频可以播放')
  if (videoRef.value) {
    duration.value = videoRef.value.duration
  }
}

// 获取视频MIME类型
const getVideoMimeType = () => {
  const format = props.format.toLowerCase()
  const mimeTypes: Record<string, string> = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'avi': 'video/x-msvideo',
    'mov': 'video/quicktime',
    'wmv': 'video/x-ms-wmv'
  }
  return mimeTypes[format] || 'video/mp4'
}

// 获取音频MIME类型
const getAudioMimeType = () => {
  const format = props.format.toLowerCase()
  const mimeTypes: Record<string, string> = {
    'mp3': 'audio/mpeg',
    'wav': 'audio/wav',
    'ogg': 'audio/ogg',
    'aac': 'audio/aac',
    'flac': 'audio/flac',
    'm4a': 'audio/mp4'
  }
  return mimeTypes[format] || 'audio/mpeg'
}

// 获取文档图标
const getDocumentIcon = () => {
  const format = props.format.toLowerCase()
  const icons: Record<string, string> = {
    'pdf': 'mdi-file-pdf-box',
    'doc': 'mdi-file-word-box',
    'docx': 'mdi-file-word-box',
    'txt': 'mdi-file-document-outline',
    'rtf': 'mdi-file-document-outline',
    'ppt': 'mdi-file-powerpoint-box',
    'pptx': 'mdi-file-powerpoint-box',
    'xls': 'mdi-file-excel-box',
    'xlsx': 'mdi-file-excel-box'
  }
  return icons[format] || 'mdi-file-document-outline'
}

// 获取文档颜色
const getDocumentColor = () => {
  const format = props.format.toLowerCase()
  const colors: Record<string, string> = {
    'pdf': 'red',
    'doc': 'blue',
    'docx': 'blue',
    'txt': 'grey',
    'rtf': 'grey',
    'ppt': 'orange',
    'pptx': 'orange',
    'xls': 'green',
    'xlsx': 'green'
  }
  return colors[format] || 'grey'
}

// 格式化时间
const formatTime = (time: number) => {
  if (!time || isNaN(time)) return '0:00'
  
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

// 格式化时长
const formatDuration = (time: number) => {
  return formatTime(time)
}

// 获取随机高度（用于音频波形）
const getRandomHeight = () => {
  return Math.random() * 100
}

// 清理资源
onUnmounted(() => {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.src = ''
  }
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value.src = ''
  }
})
</script>

<style lang="scss" scoped>
.media-preview {
  position: relative;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;

  &.loading {
    .media-loading {
      display: flex;
    }
  }

  // 图片预览
  .image-preview {
    width: 100%;
    height: 100%;
    
    .media-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s ease;
      
      &.loaded {
        opacity: 1;
      }
    }
  }

  // 视频预览
  .video-preview {
    position: relative;
    width: 100%;
    height: 100%;
    
    .media-video {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s ease;
      cursor: pointer;
      
      &.loaded {
        opacity: 1;
      }
    }
    
    .video-controls {
      position: absolute;
      bottom: 12px;
      left: 12px;
      right: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(0, 0, 0, 0.7);
      padding: 8px 12px;
      border-radius: 6px;
      backdrop-filter: blur(10px);
      transition: opacity 0.3s ease;
      z-index: 20;
      
      &.hidden {
        opacity: 0;
        pointer-events: none;
      }
      
      .play-button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.9);
        color: #333;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        
        &:hover {
          background: #4f46e5;
          color: white;
          transform: scale(1.1);
        }
        
        &.playing {
          background: #4f46e5;
          color: white;
        }
      }
      
      .video-duration {
        color: white;
        font-size: 12px;
        font-weight: 500;
      }
    }
  }

  // 音频预览
  .audio-preview {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    
    .audio-visualizer {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      margin-bottom: 20px;
      
      .audio-waveform {
        display: flex;
        align-items: end;
        gap: 3px;
        height: 60px;
        
        .wave-bar {
          width: 4px;
          background: linear-gradient(to top, #4f46e5, #8b5cf6);
          border-radius: 2px;
          transition: height 0.1s ease;
          animation: wave 1.5s ease-in-out infinite;
          
          &:nth-child(odd) {
            animation-delay: 0.1s;
          }
          
          &:nth-child(even) {
            animation-delay: 0.2s;
          }
        }
      }
    }
    
    .media-audio {
      display: none;
    }
    
    .audio-controls {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      background: rgba(0, 0, 0, 0.7);
      padding: 12px;
      border-radius: 8px;
      backdrop-filter: blur(10px);
      transition: opacity 0.3s ease;
      z-index: 20;
      
      &.hidden {
        opacity: 0;
        pointer-events: none;
      }
      
      .play-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: #4f46e5;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s ease;
        flex-shrink: 0;
        
        &:hover {
          background: #3730a3;
          transform: scale(1.05);
        }
        
        &.playing {
          background: #dc2626;
        }
      }
      
      .progress-container {
        flex: 1;
        
        .progress-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
          overflow: hidden;
          
          .progress-fill {
            height: 100%;
            background: #4f46e5;
            border-radius: 2px;
            transition: width 0.1s ease;
          }
        }
      }
      
      .time-display {
        color: white;
        font-size: 12px;
        font-weight: 500;
        white-space: nowrap;
        flex-shrink: 0;
      }
    }
  }

  // 文档预览
  .document-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 20px;
    
    .document-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .document-info {
      text-align: center;
      
      .document-name {
        color: white;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
        word-break: break-all;
      }
      
      .document-format {
        color: #888;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }

  // 未知格式预览
  .unknown-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 20px;
    
    .unknown-icon {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .unknown-info {
      text-align: center;
      
      .unknown-name {
        color: white;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 4px;
        word-break: break-all;
      }
      
      .unknown-format {
        color: #888;
        font-size: 12px;
        font-weight: 400;
      }
    }
  }

  // 加载状态
  .media-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(26, 26, 26, 0.9);
    backdrop-filter: blur(5px);
    
    .loading-spinner {
      width: 32px;
      height: 32px;
      border: 3px solid rgba(255, 255, 255, 0.1);
      border-top: 3px solid #4f46e5;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 12px;
    }
    
    .loading-text {
      color: #888;
      font-size: 12px;
    }
  }

  // 错误状态
  .media-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 20px;
    
    .error-text {
      color: #ef4444;
      font-size: 12px;
      font-weight: 500;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes wave {
  0%, 100% { transform: scaleY(0.3); }
  50% { transform: scaleY(1); }
}

// 响应式设计
@media (max-width: 768px) {
  .media-preview {
    min-height: 150px;
    
    .audio-preview {
      padding: 16px;
      
      .audio-controls {
        padding: 10px;
        gap: 8px;
        
        .play-button {
          width: 36px;
          height: 36px;
        }
        
        .time-display {
          font-size: 11px;
        }
      }
    }
    
    .video-preview .video-controls {
      padding: 6px 10px;
      
      .play-button {
        width: 28px;
        height: 28px;
      }
      
      .video-duration {
        font-size: 11px;
      }
    }
  }
}
</style>
