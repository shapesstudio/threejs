import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import ContactForm from "../components/ContactForm";
import React, { useState } from "react";

export default function Contact() {
  return (
    <Layout>
      <main className="">
        <ContactForm/>
      </main>
    </Layout>
  );
}
