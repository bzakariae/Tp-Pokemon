package com.mastercyber.tp2

// Pokemon.kt
import kotlinx.serialization.Serializable
@Serializable
data class Pokemon(
    val name: Name? = null,
    val sprites: Sprites? = null
)
