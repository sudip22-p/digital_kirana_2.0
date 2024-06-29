import React from 'react'
import '../components/css/banner.css'
import Layout from '../layout/Layout'
const AdminBanner = () => {
  return (
    <>
    <Layout>
      <main id="categoryListingPage">
        <h1>Banner</h1>
        <section class="submit-btn-container">
            <button id="updateBanner">Update Banner</button>
        </section>
        <section id="bannerContainer">
            <h2>Primary Banner</h2>
            <section class="primary-banner">
                <figure class="primary-img-banner-container"><img src="" alt="" /><span class="banner-msg">Click to upload
                        image</span></figure>
                <figure class="primary-img-banner-container"><img src="" alt="" /><span class="banner-msg">Click to upload
                        image</span></figure>
                <figure class="primary-img-banner-container"><img src="" alt="" /><span class="banner-msg">Click to upload
                        image</span></figure>
                <figure class="primary-img-banner-container"><img src="" alt="" /><span class="banner-msg">Click to upload
                        image</span></figure>
            </section>
            <h2>Secondary Banner</h2>
            <section class="secondary-banner">
                <figure class="secondary-banner-img-container"><img src="" alt="" /><span class="banner-msg">Click to
                        upload
                        image</span></figure>
            </section>

        </section>


    </main>

    </Layout>
    </>
  )
}

export default AdminBanner
