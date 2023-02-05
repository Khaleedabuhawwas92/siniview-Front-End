<template lang="pug">
v-container(fluid='')
  v-row.ma-6
    <dashboord-card massege=" مبيعات الكاش " conutNumber=3 icons="mdi-message-text" />
    <dashboord-card massege ="ahmd" conutNumber=1 icons="mdi-dialpad" />
    <dashboord-card massege = "inbrsadad" conutNumber=1 icons="mdi-email" />
  v-row
    v-col(cols="4")
      v-toolbar-title اليومي
      v-sparkline.ma-6(
        :labels="labels"
        :fill="fill"
        :gradient="selectedGradient"
        :line-width="width"
        :padding="padding"
        :smooth="radius || false"
        :value="value"
        auto-draw)
    v-col(cols="4")
      v-toolbar-title الاسبوعي
      v-sparkline.ma-6(:labels="labels"
      :fill="fill"
        :gradient="selectedGradient"
        :line-width="width"
        :padding="padding"
        :smooth="radius || false"
        :value="value"
        auto-draw)
    v-col(cols="4")
      v-toolbar-title الشهري
      v-sparkline.ma-6(:labels="labels"
      :fill="fill"
        :gradient="selectedGradient"
        :line-width="width"
        :padding="padding"
        :smooth="radius || false"
        :value="value"
        auto-draw)
    v-col(cols="4")



</template>
<script>
const gradients = [
  ['#222'],
  ['#fbc531'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {
  async fetch() {
    await this.$axios.get(`/reportItems`).then((result) => {
      this.v1 = result.data.length
      console.log(this.v1);
    });
  },

  data() {
    return {
      mini: true,
      tab: null,
      v1: 0
    }
  },
  data: () => ({

    labels: [
      '8am',
      '11am',
      '12pm',
      '3pm',
      '6pm',
      '9pm',
      '12pm',
      '3am',
    ],
    fill: true,
    selectedGradient: gradients[0],
    gradients,
    padding: 7,
    radius: 10,
    value: [
      200,
      675,
      410,
      675,
      675,
      390,
    ],
    width: 3,
  }),

}
</script>
