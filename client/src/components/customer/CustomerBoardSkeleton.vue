<template>
  <div class="row">
    <div class="col-10 col-sm-6 col-md-5 col-lg-5 col-xl-3 h-100">
      <div class="card">
        <div class="card-body">
          <el-skeleton :rows="1" animated />
        </div>
      </div>
    </div>
    <div class="col-10 col-sm-6 col-md-5 col-lg-5 col-xl-3 h-100">
      <div class="card">
        <div class="card-body">
          <el-skeleton :rows="1" animated />
        </div>
      </div>
    </div>
    <div class="col-10 col-sm-6 col-md-5 col-lg-5 col-xl-3 h-100">
      <div class="card">
        <div class="card-body">
          <el-skeleton :rows="1" animated />

        </div>
      </div>
    </div>
    <div class="col-10 col-sm-6 col-md-5 col-lg-5 col-xl-3 h-100">
      <div class="card">
        <div class="card-body">
          <el-skeleton :rows="1" animated />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerBoardSkeleton'
}
</script>
