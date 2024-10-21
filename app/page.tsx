"use client"

import useRedirect from "../hooks/useRedirect";

export default function IndexPage() {
    useRedirect('/home');
    return <></>;
}