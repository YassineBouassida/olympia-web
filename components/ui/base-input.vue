<template>
  <div :class="{required:redBorder}">
    <label class="labe mb-2" v-if="label" :for="label">
      {{label}}
      <strong class="text_primary" v-if="required">*</strong>
    </label>
    <input
      @input="verifyAndEmit($event.target.value)"
      v-if="dataField=='input'"
      class="text data_field"
      :type="iType"
      :id="label"
      :placeholder="placeholder"
      v-model="value"
    />
    <textarea
      @input="$emit('input', $event.target.value)"
      :res="false"
      v-if="dataField=='textarea'"
      class="text data_field"
      :type="iType"
      :id="label"
      :placeholder="placeholder"
      v-model="value"
    ></textarea>
    <select
      class="text data_field"
      v-if="dataField=='select'"
      :name="label"
      :id="label"
      @change="$emit('input', $event.target.value)"
      v-model="value"
    >
      <option :value="option.text" v-for="(option, index) in options" :key="index">{{option.text}}</option>
    </select>
    <h5 class="my-1" v-if="label" :for="label">
      <strong class="text_primary" v-if="required">{{error}}</strong>
    </h5>
  </div>
</template>
<script>
export default {
  props: {
    iType: {
      type: String
    },
    dataField: {
      type: String
    },
    label: {
      type: [String, Boolean]
    },
    required: {
      type: [Boolean]
    },
    placeholder: {
      type: String
    },
    options: {
      type: Array
    },
    error: {
      type: [String, Boolean]
    }
  },

  data() {
    return {
      value: "",
      redBorder: ""
    };
  },
  methods: {
    verifyAndEmit(val) {
      if (!val && this.required) {
        this.redBorder = true;
        this.$emit("errorField", this.$t("Required Field"));
        return 0;
      } else {
        this.redBorder = false;
        this.$emit("input", val);
        this.$emit("errorField", "");
        return 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.required {
  input,
  select,
  textarea {
    border: 1px solid map-get($map: $colors, $key: primary);
    &:focus-visible {
      outline: map-get($map: $colors, $key: primary) auto 1px;
    }
  }
}
label {
  font-size: 1.125rem;
  font-family: $bold;
  color: map-get($map: $colors, $key: text1);
  display: block;
}
.data_field {
  width: 100%;
  height: 2.875rem;
  border-radius: 3px;
  background: map-get($map: $colors, $key: white);
  border: 1px solid map-get($map: $colors, $key: text3);
  color: map-get($map: $colors, $key: text3);
  font-family: $regular;
  font-size: 1rem;
  padding: 0.5rem 1rem;

  &::placeholder {
    font-family: $light;
    font-size: 1rem;
  }
}
textarea {
  min-height: 9rem;
  resize: vertical;
}
</style>