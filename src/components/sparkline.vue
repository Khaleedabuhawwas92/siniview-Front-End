<template lang="pug">
v-container(fluid='')
  v-row(justify="space-between")
    <dashboordCard massege="مبيعات الكاش لليوم"  icons = "mdi-checkbox-marked-circle" conutNumber=30   />
    <dashboordCard massege="مبيعات الديلفري لليوم" icons = "mdi-antenna" conutNumber=20  />
    <dashboordCard massege="تمت  بنجاح"  icons = "mdi-domain" conutNumber=15  />
  v-row
    v-col(cols="4")
      v-toolbar-title اليومي
      v-sparkline.ma-6(
        :labels="labels"
        :gradient="selectedGradient"
        :line-width="width"
        :padding="padding"
        :smooth="radius || false"
        :value="value"
        auto-draw)
    v-col(cols="4")
      v-toolbar-title الاسبوعي
      v-sparkline.ma-6(:labels="labels"
        :gradient="selectedGradient"
        :line-width="width"
        :padding="padding"
        :smooth="radius || false"
        :value="value"
        auto-draw)
    v-col(cols="4")
      v-toolbar-title الشهري
      v-sparkline.ma-6(:labels="labels"
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
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
]

export default {
  data: () => ({
    labels: [
      '12am',
      '3am',
      '6am',
      '9am',
      '12pm',
      '3pm',
      '6pm',
      '9pm',
    ],
    fill: true,
    selectedGradient: gradients[3],
    gradients,
    padding: 7,
    radius: 10,
    value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240,
    ],
    width: 3,
  }),
}
</script>
