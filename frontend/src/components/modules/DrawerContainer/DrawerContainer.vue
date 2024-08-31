<script setup>
import { ref, watch, nextTick } from 'vue'
import { useMemberStore, useConsumeStore } from '@/stores'
import { formatDate } from '@/utils/formatTime'
import { useRoute } from 'vue-router'

const route = useRoute()
const memberStore = useMemberStore()
const consumeStore = useConsumeStore()
const memOptions = memberStore.members.map((item) => {
  return {
    value: item.name,
    label: item.name,
    id: item.memId
  }
})
const tagOptions = ref(
  consumeStore.tags.map((item) => {
    return {
      value: item,
      label: item
    }
  })
)
const props = defineProps({
  isShow: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'add'
  },
  renderData: {
    type: Object,
    default: () => {}
  },
  id: {
    type: Number,
    default: 0
  }
})

const drawer = ref(false)
watch(
  () => props.isShow,
  (newVal) => {
    drawer.value = newVal
  }
)
watch(
  [() => props.type, () => props.renderData],
  ([newType, newRenderData]) => {
    if (newType === 'add') {
      form.value = JSON.parse(JSON.stringify(defaultForm))
    } else {
      form.value = newRenderData
      selectedTag.value = newRenderData.category
    }
  }
)

const emits = defineEmits(['close'])
const closeDrawer = () => {
  drawer.value = false
  emits('close')
}

const defaultForm = {
  recipient: '',
  category: '',
  memberName: '',
  amount: 0,
  consumeDate: '',
  userNote: '',
  transactionType: route.path === '/income' ? 1 : 0
}
const form = ref({})
form.value = JSON.parse(JSON.stringify(defaultForm))

const resetForm = () => {
  form.value = JSON.parse(JSON.stringify(defaultForm))
  selectedTag.value = ''
}

const isDifferent = () => {
  // 遍历 form 的键值对
  for (const key in defaultForm) {
    if (key === 'transactionType' || key === 'userNote') {
      continue
    }
    if (form.value[key] === defaultForm[key]) {
      // 如果有一个属性相等，返回 false
      return false
    }
  }
  // 如果所有属性都不相等，返回 true
  return true
}
const submitForm = () => {
  form.value.consumeDate = formatDate(form.value.consumeDate)
  // console.log('form', form.value)
  if (!isDifferent()) {
    ElNotification({
      message: '请填写完整信息',
      type: 'error',
      duration: 2000
    })
    return
  }
  const { memberName, ...rest } = form.value
  const subForm = {
    ...rest,
    memId: memOptions.find((mem) => mem.label === memberName)?.id || null
  }
  if (props.type === 'add') {
    consumeStore.addConsume(subForm)
  } else {
    consumeStore.editConsume(subForm, props.id)
  }
  resetForm()
  drawer.value = false
}

// 选中的标签状态
const selectedTag = ref(null)

const onChange = (tag) => {
  selectedTag.value = tag
  form.value.category = tag
}

// 新增 tag
const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref(null)
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value.input.focus()
  })
}
const handleInputConfirm = () => {
  if (inputValue.value) {
    tagOptions.value.push({
      value: inputValue.value,
      label: inputValue.value
    })
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>

<template>
  <el-drawer
    v-model="drawer"
    :with-header="false"
    size="50%"
    @close="closeDrawer"
  >
    <div class="drawer-content h-full">
      <CardContainer
        class="h-full"
        :title="type === 'add' ? '新增条目' : '修改条目'"
      >
        <template #extra>🐱🐱🐱</template>
        <el-form :model="form" label-width="auto" style="max-width: 600px">
          <el-form-item label="来源/去向">
            <el-input v-model="form.recipient" />
          </el-form-item>
          <el-form-item label="条目分类">
            <div class="tags-container f-s flex-wrap">
              <div
                class="tag-box f-c m-r-8 m-t-8"
                v-for="(tag, index) in tagOptions"
                :key="index"
              >
                <el-check-tag
                  class="f-c"
                  :checked="selectedTag === tag.value"
                  type="success"
                  round
                  @change="() => onChange(tag.value)"
                >
                  {{ tag.label }}
                </el-check-tag>
              </div>
              <div class="add-tag f-c m-t-8 m-l-8">
                <el-input
                  v-if="inputVisible"
                  ref="InputRef"
                  v-model="inputValue"
                  class="w-80"
                  size="small"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button
                  v-else
                  class="button-new-tag"
                  @click="showInput"
                  size="small"
                >
                  + 新增标签
                </el-button>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="所属成员">
            <el-select v-model="form.memberName" placeholder="请选择成员">
              <div v-for="item in memOptions" :key="item.value">
                <el-option
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </div>
            </el-select>
          </el-form-item>
          <el-form-item label="条目金额">
            <el-input-number
              v-model="form.amount"
              :precision="2"
              :step="1"
              :min="0"
            />
          </el-form-item>
          <el-form-item label="条目时间">
            <el-date-picker
              v-model="form.consumeDate"
              type="date"
              placeholder="请选择日期"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="更多描述">
            <el-input v-model="form.userNote" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">提交</el-button>
            <el-button plain @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </CardContainer>
    </div>
  </el-drawer>
</template>

<style lang="scss" scoped></style>
