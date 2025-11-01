package com.mastercyber.tp2

interface Platform {
    val name: String
}

expect fun getPlatform(): Platform