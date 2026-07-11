<template>
  <section class="active">
    <SectionHeader
      :eyebrow="'Admin'"
      :title="$t('usersTitle')"
      :subtitle="$t('usersSub')"
    />

    <div class="search-card" style="max-width:800px;margin:0 auto;">
      <div class="empty-state">
        <div class="empty-state-icon">👥</div>
        <h4>User Management</h4>
        <p>This section will allow administrators to manage registered users, view profiles, and handle permissions.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeader from '@/components/SectionHeader.vue'
</script>
