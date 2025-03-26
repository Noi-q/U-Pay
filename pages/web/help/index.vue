<template>
  <view class="help-container">
    <!-- 顶部导航栏 -->
    <header class="header">
      <div class="header-content">
        <!-- 左侧 Logo 和导航菜单 -->
        <div class="left-section">
          <div class="logo">
            <img src="/static/logo.png" alt="Logo" @tap="goToHome">
          </div>
          <nav class="nav-menu">
            <text class="nav-item" @tap="goToHome">首页</text>
            <text class="nav-item active">帮助中心</text>
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
            <button class="login-btn" @tap="goToLogin">登录</button>
            <button class="register-btn" @tap="goToRegister">注册</button>
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
    <view class="main-content">
      <view class="content-wrapper">
        <!-- 搜索框 -->
        <view class="search-section">
          <view class="search-box">
            <input 
              type="text" 
              v-model="searchKey" 
              placeholder="请输入关键词搜索"
              @input="handleSearch"
            />
            <image src="/static/web/icons/search.png" mode="aspectFit" class="search-icon" />
          </view>
        </view>

        <!-- 分类和问题列表区域 -->
        <view class="faq-container">
          <!-- 左侧分类列表 -->
          <view class="category-list">
            <view 
              v-for="(category, index) in categories" 
              :key="index"
              class="category-item"
              :class="{ active: currentCategory === category.id }"
              @tap="selectCategory(category.id)"
            >
              <image :src="category.icon" mode="aspectFit" class="category-icon" />
              <text>{{ category.name }}</text>
            </view>
          </view>

          <!-- 右侧问题列表 -->
          <view class="question-list">
            <view 
              v-for="(item, index) in filteredQuestions" 
              :key="index"
              class="faq-item"
              :class="{ expanded: item.expanded }"
              @tap="toggleQuestion(index)"
            >
              <view class="question">
                <text>{{ item.question }}</text>
                <image 
                  :src="item.expanded ? '/static/web/icons/arrow-up.png' : '/static/web/icons/arrow-down.png'"
                  mode="aspectFit" 
                  class="arrow-icon"
                />
              </view>
              <view class="answer" v-show="item.expanded">
                <text>{{ item.answer }}</text>
              </view>
            </view>

            <!-- 联系客服 -->
            <view class="contact-support" v-if="filteredQuestions.length === 0">
              <text class="contact-title">没有找到相关问题？</text>
              <button class="contact-btn" @tap="contactCustomerService">联系客服</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'

// 搜索关键词
const searchKey = ref('')

// 当前选中的分类
const currentCategory = ref(1)

// 分类数据
const categories = ref([
  { id: 1, name: '账户相关', icon: '/static/web/icons/help/account.png' },
  { id: 2, name: '充值提现', icon: '/static/web/icons/help/wallet.png' },
  { id: 3, name: '安全设置', icon: '/static/web/icons/help/security.png' },
  { id: 4, name: '交易问题', icon: '/static/web/icons/help/trade.png' },
  { id: 5, name: '其他问题', icon: '/static/web/icons/help/other.png' }
])

// 问题列表
const questions = ref([
  {
    categoryId: 1,
    question: '如何注册账号？',
    answer: '您可以通过手机号或邮箱进行注册，填写验证码并设置密码即可完成注册。',
    expanded: false
  },
  {
    categoryId: 1,
    question: '忘记密码怎么办？',
    answer: '您可以通过绑定的手机号或邮箱进行密码重置，系统会发送验证码到您的手机或邮箱。',
    expanded: false
  },
  {
    categoryId: 2,
    question: '如何充值？',
    answer: '我们支持多种充值方式，包括银行卡转账、支付宝、微信等，选择适合您的方式进行充值即可。',
    expanded: false
  },
  // ... 更多问题
])

// 根据分类和搜索关键词筛选问题
const filteredQuestions = computed(() => {
  return questions.value
    .filter(q => q.categoryId === currentCategory.value)
    .filter(q => 
      searchKey.value ? 
      q.question.toLowerCase().includes(searchKey.value.toLowerCase()) || 
      q.answer.toLowerCase().includes(searchKey.value.toLowerCase()) : 
      true
    )
})

// 选择分类
const selectCategory = (categoryId) => {
  currentCategory.value = categoryId
}

// 展开/收起问题
const toggleQuestion = (index) => {
  questions.value[index].expanded = !questions.value[index].expanded
}

// 搜索处理
const handleSearch = () => {
  // 实现搜索逻辑
}

// 联系客服
const contactCustomerService = () => {
  uni.navigateTo({
    url: '/pages/customer-service/index'
  })
}

// 页面导航
const goToHome = () => {
  uni.navigateTo({
    url: '/pages/web/index'
  })
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

// 添加下载相关的变量和方法
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
</script>

<style lang="scss">
.help-container {
  min-height: 100vh;
  background: #f5f7fa;

  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 80px;
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
            cursor: pointer;
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
            cursor: pointer;

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

  .main-content {
    padding-top: 120px;
    min-height: calc(100vh - 80px);

    .content-wrapper {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 30px;

      .search-section {
        margin-bottom: 40px;

        .search-box {
          position: relative;
          max-width: 800px;
          margin: 0 auto;

          input {
            width: 100%;
            height: 44px;
            padding: 0 44px 0 15px;
            border-radius: 22px;
            border: 1px solid #e5e5e5;
            font-size: 14px;
            background: #fff;

            &:focus {
              border-color: #1677ff;
              box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
            }
          }

          .search-icon {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 18px;
            height: 18px;
          }
        }
      }

      .faq-container {
        display: flex;
        gap: 20px;
        margin-top: 20px;

        .category-list {
          width: 250px;
          flex-shrink: 0;
          background: #fff;
          border-radius: 8px;
          padding: 10px;

          .category-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px 10px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s;

            &.active {
              background: #f0f7ff;
              color: #1677ff;
            }

            .category-icon {
              width: 20px;
              height: 20px;
            }

            text {
              font-size: 14px;
            }
          }
        }

        .question-list {
          flex: 1;

          .faq-item {
            background: #fff;
            border-radius: 16rpx;
            margin-bottom: 20rpx;
            overflow: hidden;

            .question {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 30rpx;
              cursor: pointer;

              text {
                font-size: 28rpx;
                color: #333;
                flex: 1;
                margin-right: 20rpx;
              }

              .arrow-icon {
                width: 32rpx;
                height: 32rpx;
                transition: transform 0.3s;
              }
            }

            .answer {
              padding: 0 30rpx 30rpx;
              font-size: 28rpx;
              color: #666;
              line-height: 1.6;
            }

            &.expanded {
              .arrow-icon {
                transform: rotate(180deg);
              }
            }
          }
        }
      }

      .contact-support {
        text-align: center;
        margin-top: 60rpx;
        padding: 60rpx;
        background: #fff;
        border-radius: 16rpx;

        .contact-title {
          font-size: 32rpx;
          color: #333;
          margin-bottom: 30rpx;
          display: block;
        }

        .contact-btn {
          display: inline-block;
          padding: 20rpx 60rpx;
          background: #1677ff;
          color: #fff;
          border-radius: 40rpx;
          font-size: 28rpx;
        }
      }
    }
  }
}
</style> 