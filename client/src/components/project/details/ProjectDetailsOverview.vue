<template>
  <div v-if="project" class="row g-6 g-xl-9">
    <div class="col-lg-6">
      <project-details-events-chart :events-id="project.events" />
    </div>
    <div class="col-lg-6">
      <project-details-events-area-by-month :project-start="project.createdAt" :events-id="project.events" />
    </div>
    <div class="col-lg-8">
      <project-details-events-nav :events-id="project.events" />
    </div>
    <div class="col-lg-4">
      <project-details-customers-list :customers-id="project.customers" />
    </div>
  </div>
</template>
<script>
import ProjectDetailsEventsChart from './ProjectDetailsEventsChart'
import ProjectDetailsEventsAreaByMonth from './ProjectDetailsEventsAreaByMonth'
import ProjectDetailsEventsNav from './ProjectDetailsEventsNav'
import ProjectDetailsCustomersList from './ProjectDetailsCustomersList'

export default {
  props: {
    project: Object
  },
  components: {
    ProjectDetailsEventsChart,
    ProjectDetailsEventsAreaByMonth,
    ProjectDetailsEventsNav,
    ProjectDetailsCustomersList
  }
}
</script>
