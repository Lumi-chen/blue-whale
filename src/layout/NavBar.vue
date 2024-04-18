<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { setting } from '@/setting'
import Lang from '@/assets/svg/lang.svg'
import setTheme, { changeMode, handleMode } from '@/utils/style'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const route = useRoute()
const searchKeyWord = ref('')
const mode = ref('day')
const settingVisible = ref(false)
const isFollow = ref(false)
mode.value = JSON.parse(localStorage.getItem('Mode'))?.modeType
function changeModeType(value) {
  document.getElementsByTagName('html')[0].className = value
  isFollow.value = false
  changeMode(false, value)
}
function changeModeFollow(value) {
  mode.value = 'day'
  changeMode(value, 'day')
  handleMode()
}
function changeLang() {
  const lang = localStorage.getItem('langType')
  // let { locale } = i18n.global
  const newLang = lang === 'zh' ? 'en' : 'zh'
  console.log(lang, 'lang', typeof locale, newLang)
  // locale = newLang
  localStorage.setItem('langType', newLang)
  locale.value = newLang
}
</script>

<template>
  <div class="nav-bar">
    <el-breadcrumb separator="/" class="bar-left">
      <el-breadcrumb-item :to="{ path: '/' }">{{ $t(`${setting.title}`) }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="route.path !== '/'" :to="{ path: route.path }">{{ route.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="bar-right">
      <el-input v-model="searchKeyWord" placeholder="search" style="margin-right: 8px;" />
      <el-switch v-model="mode" style="--el-switch-on-color: #313852" active-value="dark" inactive-value="day"
        @change="changeModeType">
        <template #active-action>
          <Moon />
        </template>
        <template #inactive-action>
          <Sunny color="black" />
        </template>
      </el-switch>
      <el-button text circle @click="settingVisible = !settingVisible">
        <el-icon>
          <Setting />
        </el-icon>
      </el-button>
      <el-button text circle>
        <el-icon>
          <Bell />
        </el-icon>
      </el-button>
      <el-button text circle @click="changeLang">
        <Lang />
      </el-button>
      <el-button text circle>
        <el-icon>
          <User />
        </el-icon>
      </el-button>
    </div>
  </div>
  <el-drawer v-model="settingVisible" class="setting" :with-header="false" direction="rtl"
    :before-close="() => { settingVisible = !settingVisible }">
    <el-row type="flex" justify="space-between">
      <div>
        <h2>System Setting</h2>
        <div class="setting-remark">See our dashboard options.</div>
      </div>
      <el-button text style="margin: auto 0;" @click="settingVisible = !settingVisible">关闭</el-button>
    </el-row>
    <el-divider style="margin: 16px 0;" />
    <el-row>
      <el-row class="setting-title">Theme Color</el-row>
      <el-row style="margin: 10px 0 ;">
        <div class="cricle" style="background: #e91e63;" @click="setTheme('pink')"></div>
        <div class="cricle" style="background: #409eff;" @click="setTheme('blue')"></div>
        <div class="cricle" style="background: #9847c4;" @click="setTheme('purple')"></div>
        <div class="cricle" style="background: #ffa726;" @click="setTheme('orange')"></div>
      </el-row>
    </el-row>
    <el-row style="margin-top: 16px;">
      <el-row class="setting-title">System Mode</el-row>
      <el-row type="flex" style="margin-top: 16px;" justify="space-between">
        <div class="setting-option">Light / Dark</div>
        <el-switch v-model="mode" active-value="dark" inactive-value="day" @change="changeModeType" />
      </el-row>
      <el-row type="flex" style="margin-top: 16px;" justify="space-between">
        <div class="setting-option">Follow System</div>
        <el-switch v-model="isFollow" @change="changeModeFollow" />
      </el-row>
    </el-row>
  </el-drawer>
</template>

<style lang="scss" scoped>
.nav-bar {
  display: inline-flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;

  .bar-left {
    line-height: 40px;
    display: inline-flex;
    margin-right: 16px;
  }

  .bar-right {
    display: flex;
    align-items: center;
  }

  ::v-deep {
    .el-button.is-text:not(.is-disabled):hover {
      background-color: transparent;
    }

    .el-button+.el-button {
      margin: 0;
    }
  }
}

.setting {
  color: #000;

  &-remark {
    font-size: 16px;
    font-weight: 200;
    font-style: italic;
  }

  &-title {
    font-size: 18px;
    font-weight: 600;
    width: 100%;
  }

  &-option {
    line-height: 32px;
    font-weight: 400;
  }

  .cricle {
    border: 1px solid #fff;
    border-radius: 50%;
    cursor: pointer;
    display: inline-block;
    height: 32px;
    margin-right: 8px;
    position: relative;
    width: 32px;
    transition: all .2s ease-in-out;

    &:hover {
      border-color: #344767;
    }
  }
}
</style>