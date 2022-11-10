<template>
  <img :src="imageLink" alt="" class="w-9 h-9 mx-8 rounded-3xl" />
</template>

<script>
export default {
  name: "ProfileImage",
  data() {
    return {
      imageLink:
        "https://media-exp1.licdn.com/dms/image/C5603AQHYnbraOBQLog/profile-displayphoto-shrink_400_400/0/1610733729200?e=1673481600&v=beta&t=bsQ8_d92shhI-1z1Q_nBwnzHxbuI0seAH8ga7YrPkIc",
    };
  },
};
</script>

<style scoped></style>
