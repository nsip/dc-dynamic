<template>
    <q-page>
        <div class="search-page">
            <div class="row container">
                <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <div class="select-box">
                        <div class="column select-box-input">
                            <div class="col-xs-4 col-sm-4 col-md-6 col-lg-6">
                                <img src="../assets/searchtool.png">
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-3 col-lg-3">
                                <q-select class="input-box" stack-label="Teachers by name" color="white" inverted-light v-model="selectedteacher" :options="teachers" />
                            </div>
                            <div class="col-xs-2 col-sm-2 col-md-3 col-lg-3">
                                <q-btn class="full-width" label="search" color="cyan-6" @click="getResult" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-12 col-md-8 col-lg-8 relative-position" style="background-color: #FDFCFF">
                    <transition appear enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
                        <div class="column result-box">
                            <div class="col-xs-4 col-sm-4 col-md-6 col-lg-6">
                                <img src="../assets/timetable.png">
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-6 col-lg-6" v-if="showReturnData">
                                <p>Please select a teacher to start...</p>
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-6 col-lg-6" v-else>
                                <pivot class="result-table" :data="List" :fields="fields" :row-fields="rowFields" :col-fields="colFields" :reducer="reducer" :default-show-settings="defaultShowSettings" hide-settings-text="Hide settings">
                                    <template slot="value" slot-scope="{ value }">
                                        <q-btn class="table-button" color="cyan-7" flat :style="value.display?'display:inline-flex':'display:none'" :to="{name:'test', params:{value: value}}" ref="test">{{ value.ShortName }}</q-btn>
                                    </template>
                                </pivot>
                            </div>
                        </div>
                    </transition>
                    <q-inner-loading :visible="visible">
                        <q-spinner size="50px" color="cyan-7" />
                    </q-inner-loading>
                </div>
            </div>
        </div>
    </q-page>
</template>
<script>
// import vueCanvasNest from 'vue-canvas-nest'
import Pivot from '@marketconnect/vue-pivot-table'
import { n3baseUrl, authHeader } from '../data'
// import { QSpinnerFacebook } from 'quasar'
// import axios from 'axios'

export default {
    components: {
        // vueCanvasNest
        // PivotTable
        Pivot
        // Schedule
    },
    props: ['username'],
    data: () => {
        return {
            visible: false,
            showReturnData: true,
            rowFields: [{
                getter: item => item.PeriodId,
                label: 'PeriodId'
            }],
            colFields: [{
                getter: item => item.DayId,
                label: 'DayId',
                sort: (a, b) => {
                    const sorter = {
                        'Mo': 1,
                        'Tu': 2,
                        'We': 3,
                        'Th': 4,
                        'Fr': 5
                    }
                    let day1 = a.item
                    let day2 = b.item
                    return sorter[day1] - sorter[day2]
                }
            }],
            reducer: (sum, item) => { return item },
            defaultShowSettings: false,
            isDataLoading: false,
            fields: [],
            teachers: [],
            selectedteacher: '',
            loading: false,
            isdisable: true,
            isshow: false,
            teachgroup: [],
            teachtimesheet: [],
            List: [],
            ArrayList: []
        }
    },
    created() {
        // 
        // fetch the list of teachers
        // 
        const axios = require('axios')
        axios({
            url: n3baseUrl + '/graphql',
            method: 'post',
            headers: authHeader,
            data: {
                query: teacherQuery,
                variables: {
                    qspec: {
                        queryType: "findByType",
                        queryValue: "StaffPersonal"
                    }
                }
            }
        }).then((result) => {
            console.log(result.data)
            this.teachers = result.data.data.q.StaffPersonal.map(e => {
                return {
                    label: e.PersonInfo.Name.GivenName + ' ' + e.PersonInfo.Name.FamilyName,
                    value: e.RefId
                }
            })
            console.log(this.teachers)
        })
    },
    methods: {
        clearData() {
            this.selectedteacher = ''
        },

        // 
        // get teaching groups for ths teacher
        // 
        getResult() {
            this.ArrayList = []
            let RefId, ShortName, DayId, PeriodId, RoomNumber
            this.visible = true
            console.log(this.selectedteacher)
            const axios = require('axios')
            setTimeout(() => {
                axios({
                    url: n3baseUrl + '/graphql',
                    method: 'post',
                    headers: authHeader,
                    data: {
                        query: teachingGroupQuery,
                        variables: {
                            qspec: {
                                queryType: "traversalWithId",
                                queryValue: this.selectedteacher,
                                traversal: [
                                    "StaffPersonal",
                                    "TeachingGroup"
                                ]
                            }
                        }
                    }
                }).then((result) => {
                    this.teachgroup = result.data.data.q.TeachingGroup
                    for (let a of this.teachgroup) {
                        for (let b = 0; b < a.TeachingGroupPeriodList.TeachingGroupPeriod.length; b++) {
                            RefId = a.RefId
                            ShortName = a.ShortName
                            DayId = a.TeachingGroupPeriodList.TeachingGroupPeriod[b].DayId
                            PeriodId = a.TeachingGroupPeriodList.TeachingGroupPeriod[b].PeriodId
                            RoomNumber = a.TeachingGroupPeriodList.TeachingGroupPeriod[b].RoomNumber
                            this.ArrayList.push({ RefId, ShortName, DayId, PeriodId, RoomNumber })
                        }
                    }
                    console.log(this.ArrayList)
                    this.List = this.ArrayList.map(function(el) {
                        var o = Object.assign({}, el)
                        o.display = true
                        return o
                    })
                    let isTen = this.List.filter(function(obj) {
                        return obj.PeriodId === '10:00:00'
                    })
                    let isEleven = this.List.filter(function(obj) {
                        return obj.PeriodId === '11:00:00'
                    })
                    let isTw = this.List.filter(function(obj) {
                        return obj.PeriodId === '12:00:00'
                    })
                    let isThr = this.List.filter(function(obj) {
                        return obj.PeriodId === '13:00:00'
                    })
                    let isFor = this.List.filter(function(obj) {
                        return obj.PeriodId === '14:00:00'
                    })
                    let isFif = this.List.filter(function(obj) {
                        return obj.PeriodId === '15:00:00'
                    })
                    let isSix = this.List.filter(function(obj) {
                        return obj.PeriodId === '16:00:00'
                    })
                    if (isTen.length < 7) {
                        if (isTen.filter(function(e) { return e.DayId === 'Mo' }).length === 0) {
                            this.List.push({ DayId: 'Mo', PeriodId: '10:00:00', ShortName: '', display: false })
                        }
                        if (isTen.filter(function(e) { return e.DayId === 'Tu' }).length === 0) {
                            this.List.push({ DayId: 'Tu', PeriodId: '10:00:00', ShortName: '', display: false })
                        }
                        if (isTen.filter(function(e) { return e.DayId === 'We' }).length === 0) {
                            this.List.push({ DayId: 'We', PeriodId: '10:00:00', ShortName: '', display: false })
                        }
                        if (isTen.filter(function(e) { return e.DayId === 'Th' }).length === 0) {
                            this.List.push({ DayId: 'Th', PeriodId: '10:00:00', ShortName: '', display: false })
                        }
                        if (isTen.filter(function(e) { return e.DayId === 'Fr' }).length === 0) {
                            this.List.push({ DayId: 'Fr', PeriodId: '10:00:00', ShortName: '', display: false })
                        }
                    }
                    if (isEleven.length < 7) {
                        if (isEleven.filter(function(e) { return e.DayId === 'Mo' }).length === 0) {
                            this.List.push({ DayId: 'Mo', PeriodId: '11:00:00', ShortName: '', display: false })
                        }
                        if (isEleven.filter(function(e) { return e.DayId === 'Tu' }).length === 0) {
                            this.List.push({ DayId: 'Tu', PeriodId: '11:00:00', ShortName: '', display: false })
                        }
                        if (isEleven.filter(function(e) { return e.DayId === 'We' }).length === 0) {
                            this.List.push({ DayId: 'We', PeriodId: '11:00:00', ShortName: '', display: false })
                        }
                        if (isEleven.filter(function(e) { return e.DayId === 'Th' }).length === 0) {
                            this.List.push({ DayId: 'Th', PeriodId: '11:00:00', ShortName: '', display: false })
                        }
                        if (isEleven.filter(function(e) { return e.DayId === 'Fr' }).length === 0) {
                            this.List.push({ DayId: 'Fr', PeriodId: '11:00:00', ShortName: '', display: false })
                        }
                    }
                    if (isTw.length < 7) {
                        if (isTw.filter(function(e) { return e.DayId === 'Mo' }).length === 0) {
                            this.List.push({ DayId: 'Mo', PeriodId: '12:00:00', ShortName: '', display: false })
                        }
                        if (isTw.filter(function(e) { return e.DayId === 'Tu' }).length === 0) {
                            this.List.push({ DayId: 'Tu', PeriodId: '12:00:00', ShortName: '', display: false })
                        }
                        if (isTw.filter(function(e) { return e.DayId === 'We' }).length === 0) {
                            this.List.push({ DayId: 'We', PeriodId: '12:00:00', ShortName: '', display: false })
                        }
                        if (isTw.filter(function(e) { return e.DayId === 'Th' }).length === 0) {
                            this.List.push({ DayId: 'Th', PeriodId: '12:00:00', ShortName: '', display: false })
                        }
                        if (isTw.filter(function(e) { return e.DayId === 'Fr' }).length === 0) {
                            this.List.push({ DayId: 'Fr', PeriodId: '12:00:00', ShortName: '', display: false })
                        }
                    }
                    if (isThr.length < 7) {
                        if (isThr.filter(function(e) { return e.DayId === 'Mo' }).length === 0) {
                            this.List.push({ DayId: 'Mo', PeriodId: '13:00:00', ShortName: '', display: false })
                        }
                        if (isThr.filter(function(e) { return e.DayId === 'Tu' }).length === 0) {
                            this.List.push({ DayId: 'Tu', PeriodId: '13:00:00', ShortName: '', display: false })
                        }
                        if (isThr.filter(function(e) { return e.DayId === 'We' }).length === 0) {
                            this.List.push({ DayId: 'We', PeriodId: '13:00:00', ShortName: '', display: false })
                        }
                        if (isThr.filter(function(e) { return e.DayId === 'Th' }).length === 0) {
                            this.List.push({ DayId: 'Th', PeriodId: '13:00:00', ShortName: '', display: false })
                        }
                        if (isThr.filter(function(e) { return e.DayId === 'Fr' }).length === 0) {
                            this.List.push({ DayId: 'Fr', PeriodId: '13:00:00', ShortName: '', display: false })
                        }
                    }
                    if (isFor.length < 7) {
                        if (isFor.filter(function(e) { return e.DayId === 'Mo' }).length === 0) {
                            this.List.push({ DayId: 'Mo', PeriodId: '14:00:00', ShortName: '', display: false })
                        }
                        if (isFor.filter(function(e) { return e.DayId === 'Tu' }).length === 0) {
                            this.List.push({ DayId: 'Tu', PeriodId: '14:00:00', ShortName: '', display: false })
                        }
                        if (isFor.filter(function(e) { return e.DayId === 'We' }).length === 0) {
                            this.List.push({ DayId: 'We', PeriodId: '14:00:00', ShortName: '', display: false })
                        }
                        if (isFor.filter(function(e) { return e.DayId === 'Th' }).length === 0) {
                            this.List.push({ DayId: 'Th', PeriodId: '14:00:00', ShortName: '', display: false })
                        }
                        if (isFor.filter(function(e) { return e.DayId === 'Fr' }).length === 0) {
                            this.List.push({ DayId: 'Fr', PeriodId: '14:00:00', ShortName: '', display: false })
                        }
                    }
                    if (isFif.length < 7) {
                        if (isFif.filter(function(e) { return e.DayId === 'Mo' }).length === 0) {
                            this.List.push({ DayId: 'Mo', PeriodId: '15:00:00', ShortName: '', display: false })
                        }
                        if (isFif.filter(function(e) { return e.DayId === 'Tu' }).length === 0) {
                            this.List.push({ DayId: 'Tu', PeriodId: '15:00:00', ShortName: '', display: false })
                        }
                        if (isFif.filter(function(e) { return e.DayId === 'We' }).length === 0) {
                            this.List.push({ DayId: 'We', PeriodId: '15:00:00', ShortName: '', display: false })
                        }
                        if (isFif.filter(function(e) { return e.DayId === 'Th' }).length === 0) {
                            this.List.push({ DayId: 'Th', PeriodId: '15:00:00', ShortName: '', display: false })
                        }
                        if (isFif.filter(function(e) { return e.DayId === 'Fr' }).length === 0) {
                            this.List.push({ DayId: 'Fr', PeriodId: '15:00:00', ShortName: '', display: false })
                        }
                    }
                    if (isSix.length < 7) {
                        if (isSix.filter(function(e) { return e.DayId === 'Mo' }).length === 0) {
                            this.List.push({ DayId: 'Mo', PeriodId: '16:00:00', ShortName: '', display: false })
                        }
                        if (isSix.filter(function(e) { return e.DayId === 'Tu' }).length === 0) {
                            this.List.push({ DayId: 'Tu', PeriodId: '16:00:00', ShortName: '', display: false })
                        }
                        if (isSix.filter(function(e) { return e.DayId === 'We' }).length === 0) {
                            this.List.push({ DayId: 'We', PeriodId: '16:00:00', ShortName: '', display: false })
                        }
                        if (isSix.filter(function(e) { return e.DayId === 'Th' }).length === 0) {
                            this.List.push({ DayId: 'Th', PeriodId: '16:00:00', ShortName: '', display: false })
                        }
                        if (isSix.filter(function(e) { return e.DayId === 'Fr' }).length === 0) {
                            this.List.push({ DayId: 'Fr', PeriodId: '16:00:00', ShortName: '', display: false })
                        }
                    }
                    for (let b of this.List) {
                        if (b.DayId === 'Mo') {
                            b.DayId = 'Monday'
                        }
                        if (b.DayId === 'Tu') {
                            b.DayId = 'Tuesday'
                        }
                        if (b.DayId === 'We') {
                            b.DayId = 'Wednesday'
                        }
                        if (b.DayId === 'Th') {
                            b.DayId = 'Thursday'
                        }
                        if (b.DayId === 'Fr') {
                            b.DayId = 'Friday'
                        }
                    }
                    const sorter = {
                        'Monday': 1,
                        'Tuesday': 2,
                        'Wednesday': 3,
                        'Thursday': 4,
                        'Friday': 5
                    }
                    this.List.sort(function sortByDay(a, b) {
                        let day1 = a.DayId
                        let day2 = b.DayId
                        return sorter[day1] - sorter[day2]
                    })
                    console.log(this.List)
                })




                this.visible = false
                this.showReturnData = false
            }, 500)
        }
    }
}


let teacherQuery = `
query teachersQuery($qspec: QueryInput!) {
  q(qspec: $qspec) {
    StaffPersonal {
      RefId
      PersonInfo {
        Name {
          FamilyName
          GivenName
        }
      }
    }
  }
}
`

let teachingGroupQuery = `
query fullTraversal($qspec: QueryInput!) {
  q(qspec: $qspec) {
    TeachingGroup {
      SchoolYear
      LocalId
      LongName
      ShortName
      TimeTableSubjectRefId
      RefId
      TeachingGroupPeriodList {
        TeachingGroupPeriod {
          DayId
          PeriodId
          RoomNumber
        }
      }
    }
  }
}
`
</script>