<template>

  <div class="web-container">
    <!-- 顶部导航 -->
    <header class="header">
      <div class="header-content">
        <!-- 左侧 Logo 和导航菜单 -->
        <div class="left-section">
          <div class="logo">
            <img src="/static/logo.png" alt="Logo">
          </div>
          <nav class="nav-menu">
            <a href="#home" class="nav-item active">首页</a>
            <a href="#pages/web/help/index" class="nav-item">帮助中心</a>
          </nav>
        </div>

        <!-- 右侧下载和登录按钮 -->
        <div class="right-section">
          <div class="download-buttons">
            <button class="download-btn ios" @tap="downloadIOS">
              <image src="/static/web/icons/apple_white.png" mode="aspectFit" class="platform-icon" />
              <text>iOS 下载</text>
            </button>
            <button class="download-btn android" @tap="downloadAndroid">
              <image src="/static/web/icons/android_white.png" mode="aspectFit" class="platform-icon" />
              <text>Android 下载</text>
            </button>
          </div>
          <div class="action-buttons">
            <button class="login-btn" @click="goToLogin">登录</button>
            <button class="register-btn" @click="goToRegister">注册</button>
          </div>
          <!-- 二维码浮层 -->
          <view class="qrcode-wrapper" v-if="showQRCode">
            <l-qrcode class="qrcode" :value="currentQRCode" />
            <text class="qrcode-text">{{ qrcodeText }}</text>
          </view>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main>
      <!-- Banner区域 -->
      <section id="home" class="banner">
        <div class="banner-content">
          <h1>全球领先的数字支付解决方案</h1>
          <p>安全、便捷、高效的支付体验</p>
          <button class="start-btn" @click="goToRegister">立即开始</button>
        </div>
      </section>

      <!-- 产品特点 -->
      <section id="features" class="features">
        <h2>产品特点</h2>
        <div class="feature-grid">
          <div class="feature-item">
            <img src="/static/web/icons/security.png" alt="安全">
            <h3>安全可靠</h3>
            <p>多重加密保护，确保资金安全</p>
          </div>
          <div class="feature-item">
            <img src="/static/web/icons/fast.png" alt="快速">
            <h3>快速交易</h3>
            <p>秒级确认，实时到账</p>
          </div>
          <div class="feature-item">
            <img src="/static/web/icons/global.png" alt="全球">
            <h3>全球支持</h3>
            <p>支持多国货币，跨境支付</p>
          </div>
        </div>
      </section>

      <!-- 服务介绍 -->
      <section id="services" class="services">
        <h2>服务介绍</h2>
        <div class="service-list">
          <div class="service-item">
            <h3>数字货币支付</h3>
            <p>支持多种主流数字货币，快速安全</p>
          </div>
          <div class="service-item">
            <h3>商户收款</h3>
            <p>一站式商户收款解决方案</p>
          </div>
          <div class="service-item">
            <h3>跨境支付</h3>
            <p>便捷的国际支付服务</p>
          </div>
        </div>
      </section>

      <!-- 关于我们 -->
      <section id="about" class="about">
        <h2>关于我们</h2>
        <div class="about-content">
          <p>我们致力于提供最优质的数字支付服务，为全球用户打造安全、便捷的支付体验。</p>
        </div>
      </section>

      <!-- 联系我们 -->
      <section id="contact" class="contact">
        <h2>联系我们</h2>
        <div class="contact-content">
          <div class="contact-info">
            <p>邮箱：support@example.com</p>
            <p>电话：+852 xxxx xxxx</p>
            <p>地址：香港特别行政区</p>
          </div>
        </div>
      </section>
    </main>

    <!-- 底部下载区域 -->
    <view class="download-section">
      <view class="download-wrapper">
        <view class="download-info">
          <text class="download-title">下载 App</text>
          <text class="download-desc">支持 iOS 和 Android 系统</text>
        </view>
        <view class="platform-buttons">
          <view class="platform-item" @tap="showIOSQRCode">
            <image src="/static/web/icons/apple.png" mode="aspectFit" class="platform-logo" />
            <view class="platform-info">
              <text class="platform-name">iOS 版本</text>
              <text class="platform-tip">扫码下载</text>
            </view>
          </view>
          <view class="platform-item" @tap="showAndroidQRCode">
            <image src="/static/web/icons/android.png" mode="aspectFit" class="platform-logo" />
            <view class="platform-info">
              <text class="platform-name">Android 版本</text>
              <text class="platform-tip">扫码下载</text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <p>© 2025 U Pay. All rights reserved.</p>
          <p>
            <a href="#">隐私政策</a> | 
            <a href="#">服务条款</a> | 
            <a href="#">免责声明</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showQRCode = ref(false)
const currentQRCode = ref('')
const qrcodeText = ref('')

// iOS 下载链接和二维码
const iosAppUrl = 'https://apps.apple.com/your-app-url'
const iosQRCode = '/static/web/qrcode/ios_qrcode.png'

// Android 下载链接和二维码
const androidAppUrl = 'https://play.google.com/store/apps/your-app-url'
const androidQRCode = '/static/web/qrcode/android_qrcode.png'

const downloadIOS = () => {
  window.open(iosAppUrl)
}

const downloadAndroid = () => {
  window.open(androidAppUrl)
}

const showIOSQRCode = () => {
  showQRCode.value = true
  currentQRCode.value = iosQRCode
  qrcodeText.value = '扫码下载 iOS 版本'
}

const showAndroidQRCode = () => {
  showQRCode.value = true
  currentQRCode.value = androidQRCode
  qrcodeText.value = '扫码下载 Android 版本'
}

const goToLogin = () => {
  uni.navigateTo({
    url: '/pages/web/login'
  })
}

const goToRegister = () => {
  uni.navigateTo({
    url: '/pages/web/register'
  })
}
</script>

<style lang="scss">
/* #ifdef H5 */
.mobile-tip {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28rpx;
  color: #666;
}
/* #endif */

/* #ifdef WEB */
.web-container {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .left-section {
        display: flex;
        align-items: center;
        gap: 40px;

        .logo {
          img {
            height: 40px;
          }
        }

        .nav-menu {
          display: flex;
          gap: 30px;

          .nav-item {
            color: #333;
            text-decoration: none;
            font-size: 16px;
            transition: color 0.3s;

            &:hover, &.active {
              color: #1677ff;
            }
          }
        }
      }

      .right-section {
        display: flex;
        align-items: center;
        gap: 20px;
        position: relative;

        .download-buttons {
          display: flex;
          gap: 10px;
          
          .download-btn {
            display: flex;
            align-items: center;
            padding: 8px 16px;
            border-radius: 4px;
            border: none;
            background: #1677ff;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;
            
            &.ios {
              background: #000;
              
              &:hover {
                background: #333;
              }
            }
            
            &:hover {
              background: #0e5cd0;
            }
            
            .platform-icon {
              width: 16px;
              height: 16px;
              margin-right: 6px;
            }
          }
        }

        .action-buttons {
          display: flex;
          gap: 10px;

          button {
            padding: 8px 16px;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s;

            &.login-btn {
              background: transparent;
              border: 1px solid #1677ff;
              color: #1677ff;

              &:hover {
                background: rgba(22, 119, 255, 0.1);
              }
            }

            &.register-btn {
              background: #1677ff;
              border: none;
              color: #fff;

              &:hover {
                background: #0e5cd0;
              }
            }
          }
        }

        .qrcode-wrapper {
          position: absolute;
          top: 120%;
          right: 0;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          z-index: 1001;
          
          .qrcode {
            width: 160px;
            height: 160px;
            display: block;
          }
          
          .qrcode-text {
            font-size: 14px;
            color: #666;
            text-align: center;
            margin-top: 8px;
            display: block;
          }
        }
      }
    }
  }

  main {
    padding-top: 80px;

    .banner {
      background: linear-gradient(135deg, #1677ff, #0e5cd0);
      color: #fff;
      padding: 100px 0;
      text-align: center;

      .banner-content {
        max-width: 800px;
        margin: 0 auto;

        h1 {
          font-size: 48px;
          margin-bottom: 20px;
        }

        p {
          font-size: 24px;
          margin-bottom: 40px;
        }

        .start-btn {
          padding: 15px 40px;
          font-size: 18px;
          background: #fff;
          color: #1677ff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }
        }
      }
    }

    section {
      padding: 80px 0;
      max-width: 1200px;
      margin: 0 auto;

      h2 {
        text-align: center;
        font-size: 36px;
        margin-bottom: 60px;
        color: #333;
      }

      &.features {
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;

          .feature-item {
            text-align: center;
            padding: 30px;

            img {
              width: 80px;
              height: 80px;
              margin-bottom: 20px;
            }

            h3 {
              font-size: 24px;
              margin-bottom: 15px;
              color: #333;
            }

            p {
              color: #666;
              line-height: 1.6;
            }
          }
        }
      }

      &.services {
        background: #f5f7fa;

        .service-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;

          .service-item {
            background: #fff;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

            h3 {
              font-size: 20px;
              margin-bottom: 15px;
              color: #333;
            }

            p {
              color: #666;
              line-height: 1.6;
            }
          }
        }
      }
    }
  }

  .footer {
    background: #333;
    color: #fff;
    padding: 40px 0;

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;

      .footer-info {
        p {
          margin: 10px 0;
        }

        a {
          color: #fff;
          text-decoration: none;
          margin: 0 10px;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .download-section {
    background: #f8f9fa;
    padding: 80rpx 0;
    
    .download-wrapper {
      max-width: 1200rpx;
      margin: 0 auto;
      padding: 0 30rpx;
      
      .download-info {
        text-align: center;
        margin-bottom: 60rpx;
        
        .download-title {
          font-size: 48rpx;
          color: #333;
          font-weight: 500;
          margin-bottom: 20rpx;
          display: block;
        }
        
        .download-desc {
          font-size: 28rpx;
          color: #666;
        }
      }
      
      .platform-buttons {
        display: flex;
        justify-content: center;
        gap: 60rpx;
        
        .platform-item {
          display: flex;
          align-items: center;
          padding: 30rpx 40rpx;
          background: #fff;
          border-radius: 16rpx;
          box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.05);
          cursor: pointer;
          transition: transform 0.3s;
          
          &:hover {
            transform: translateY(-5rpx);
          }
          
          .platform-logo {
            width: 80rpx;
            height: 80rpx;
            margin-right: 20rpx;
          }
          
          .platform-info {
            .platform-name {
              font-size: 32rpx;
              color: #333;
              font-weight: 500;
              display: block;
              margin-bottom: 8rpx;
            }
            
            .platform-tip {
              font-size: 24rpx;
              color: #666;
            }
          }
        }
      }
    }
  }
}
/* #endif */
</style> 