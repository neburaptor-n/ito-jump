import React, { useState, useRef, useEffect } from 'react';
import { Play, ArrowLeft, RefreshCw, Layers, Sparkles, Tv, Flame } from 'lucide-react';

// ==========================================
// DATOS
// ==========================================

const DECK_ICONS = {
  normal: Layers,
  nsfw: Flame,
  anime: Tv,
};

// Clases completas de Tailwind — no se pueden interpolar dinámicamente (JIT las purga)
const DECK_STYLES = {
  normal: {
    checkbox: {
      active: 'border-red-500 bg-red-50 text-red-700',
      iconBg: 'bg-red-100',
      check: 'bg-red-500 border-red-500',
    },
    card: { bar: 'bg-red-500', glow: 'bg-red-50', icon: 'bg-red-50 text-red-600' },
    button: 'bg-red-600 hover:bg-red-700',
    backButton: 'hover:text-red-300',
  },
  nsfw: {
    checkbox: {
      active: 'border-lime-500 bg-lime-50 text-lime-700',
      iconBg: 'bg-lime-100',
      check: 'bg-lime-500 border-lime-500',
    },
    card: { bar: 'bg-lime-500', glow: 'bg-lime-50', icon: 'bg-lime-50 text-lime-600' },
    button: 'bg-lime-600 hover:bg-lime-700',
    backButton: 'hover:text-lime-300',
  },
  anime: {
    checkbox: {
      active: 'border-blue-500 bg-blue-50 text-blue-700',
      iconBg: 'bg-blue-100',
      check: 'bg-blue-500 border-blue-500',
    },
    card: { bar: 'bg-blue-500', glow: 'bg-blue-50', icon: 'bg-blue-50 text-blue-600' },
    button: 'bg-blue-600 hover:bg-blue-700',
    backButton: 'hover:text-blue-300',
  },
};

const DECK_DISPLAY_NAMES = {
  normal: 'MAZO: NORMAL / CASUAL',
  nsfw: 'MAZO: NSFW / +18',
  anime: 'MAZO: ANIME / GEEK',
};

const DATA_DECKS = {
  normal: [
    { topic: "Superpoderes", min: "El menos poderoso", max: "El más poderoso", deckKey: 'normal' },
    { topic: "Lugares para empezar a bailar incontrolablemente", min: "El peor lugar", max: "El mejor lugar", deckKey: 'normal' },
    { topic: "Pasos de baile", min: "El peor paso", max: "El mejor paso", deckKey: 'normal' },
    { topic: "Fragancias y olores", min: "El peor olor", max: "El mejor olor", deckKey: 'normal' },
    { topic: "Cosas fáciles o difíciles de dejar para siempre", min: "La más fácil de dejar", max: "La más difícil de dejar", deckKey: 'normal' },
    { topic: "Cosas que puedes conjurar de la nada", min: "La peor cosa", max: "La mejor cosa", deckKey: 'normal' },
    { topic: "Celebridades en una pelea", min: "La más débil", max: "La más fuerte", deckKey: 'normal' },
    { topic: "Cosas que puedes comprar con $10,000", min: "La menos práctica", max: "La más práctica", deckKey: 'normal' },
    { topic: "Escenarios molestos", min: "El menos molesto", max: "El más molesto", deckKey: 'normal' },
    { topic: "Razones para iniciar una misión", min: "La peor razón", max: "La mejor razón", deckKey: 'normal' },
    { topic: "Cosas tiernas", min: "La menos tierna", max: "La más tierna", deckKey: 'normal' },
    { topic: "Cosas que podrías hacer si pudieras congelar el tiempo", min: "La peor cosa", max: "La mejor cosa", deckKey: 'normal' },
    { topic: "Memes", min: "El menos gracioso", max: "El más gracioso", deckKey: 'normal' },
    { topic: "Cosas donde puedes meter el dedo", min: "La peor opción", max: "La mejor opción", deckKey: 'normal' },
    { topic: "Cosas para regalar", min: "El peor regalo", max: "El mejor regalo", deckKey: 'normal' },
    { topic: "Cosas para controlar con la mente", min: "La peor cosa", max: "La mejor cosa", deckKey: 'normal' },
    { topic: "Cosas que harías si vieras un fantasma", min: "Lo menos probable", max: "Lo más probable", deckKey: 'normal' },
    { topic: "Lugares para visitar como turista", min: "El peor lugar", max: "El mejor lugar", deckKey: 'normal' },
    { topic: "Finales de películas/series", min: "El peor final", max: "El mejor final", deckKey: 'normal' },
    { topic: "Animales que te gustaría ser", min: "El que menos", max: "El que más", deckKey: 'normal' },
    { topic: "Snacks", min: "El peor snack", max: "El mejor snack", deckKey: 'normal' },
    { topic: "Consejos para darle a un niño", min: "El peor consejo", max: "El mejor consejo", deckKey: 'normal' },
    { topic: "Actividades divertidas", min: "La menos divertida", max: "La más divertida", deckKey: 'normal' },
    { topic: "Escenarios cringe/incómodos", min: "El menos incómodo", max: "El más incómodo", deckKey: 'normal' },
    { topic: "Cosas para poner en un smoothie", min: "La peor cosa", max: "La mejor cosa", deckKey: 'normal' },
    { topic: "Prendas de vestir", min: "La menos fashion", max: "La más fashion", deckKey: 'normal' },
    { topic: "Artistas musicales", min: "El peor", max: "El mejor", deckKey: 'normal' },
    { topic: "Cosas que mejorarían tu día", min: "La que menos mejora", max: "La que más mejora", deckKey: 'normal' },
    { topic: "Celebridades talentosas", min: "La menos talentosa", max: "La más talentosa", deckKey: 'normal' },
    { topic: "Animales o seres fantásticos como mascota", min: "El menos genial", max: "El más genial", deckKey: 'normal' },
    { topic: "Películas/series que te harían reír", min: "La menos probable", max: "La más probable", deckKey: 'normal' },
    { topic: "Momentos de películas/series que te harían llorar", min: "El menos probable", max: "El más probable", deckKey: 'normal' },
    { topic: "Cosas que hacer si apareces en la Edad Media", min: "La peor cosa", max: "La mejor cosa", deckKey: 'normal' },
    { topic: "Postres/dulces", min: "El peor", max: "El mejor", deckKey: 'normal' },
    { topic: "Nombres de superhéroes", min: "El peor nombre", max: "El mejor nombre", deckKey: 'normal' },
    { topic: "Items de comida rápida", min: "El peor item", max: "El mejor item", deckKey: 'normal' },
    { topic: "Cosas que probablemente te asustarían", min: "Lo menos aterrador", max: "Lo más aterrador", deckKey: 'normal' },
    { topic: "Criaturas que podrías vencer de un puñetazo", min: "El más probable de vencer", max: "El menos probable", deckKey: 'normal' },
    { topic: "Personajes ficticios en una pelea", min: "El más débil", max: "El más fuerte", deckKey: 'normal' },
    { topic: "Experiencias impactantes", min: "La menos impactante", max: "La más impactante", deckKey: 'normal' },
    { topic: "Épocas históricas para viajar", min: "La peor época", max: "La mejor época", deckKey: 'normal' },
    { topic: "Cosas para servir en un restaurante 5 estrellas", min: "La peor cosa", max: "La mejor cosa", deckKey: 'normal' },
    { topic: "Hobbies", min: "El menos interesante", max: "El más interesante", deckKey: 'normal' },
    { topic: "Cosas que harías en un día libre", min: "Lo menos probable", max: "Lo más probable", deckKey: 'normal' },
    { topic: "Cosas fáciles o difíciles de aprender", min: "La más fácil", max: "La más difícil", deckKey: 'normal' },
    { topic: "Deseos que pedirías", min: "El peor deseo", max: "El mejor deseo", deckKey: 'normal' },
    { topic: "Personas ricas o pobres", min: "La más pobre", max: "La más rica", deckKey: 'normal' },
    { topic: "Cosas para hacer cada día", min: "La peor cosa", max: "La mejor cosa", deckKey: 'normal' },
    { topic: "Formas de viajar 1000 km", min: "La peor forma", max: "La mejor forma", deckKey: 'normal' },
    { topic: "Sonidos/ruidos", min: "El peor sonido", max: "El mejor sonido", deckKey: 'normal' },
    { topic: "Canciones", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Bebidas", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Mundos ficticios donde vivir", min: "El que menos", max: "El que más", deckKey: 'normal' },
    { topic: "Personas con quienes intercambiar cuerpos", min: "La que menos", max: "La que más", deckKey: 'normal' },
    { topic: "Personas o cosas para estar en una isla desierta", min: "La menos deseada", max: "La más deseada", deckKey: 'normal' },
    { topic: "Cosas para almorzar", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Canciones probables de escuchar en karaoke", min: "La menos probable", max: "La más probable", deckKey: 'normal' },
    { topic: "Temas sobre los que escribir una canción", min: "El peor tema", max: "El mejor tema", deckKey: 'normal' },
    { topic: "Animales comunes o raros", min: "El más común", max: "El menos común", deckKey: 'normal' },
    { topic: "Récords mundiales", min: "El menos impresionante", max: "El más impresionante", deckKey: 'normal' },
    { topic: "Cosas para poner en un CV", min: "La menos impresionante", max: "La más impresionante", deckKey: 'normal' },
    { topic: "Cosas que puedes cocinar en casa", min: "La más fácil", max: "La más difícil", deckKey: 'normal' },
    { topic: "Lugares de tu ciudad para comer", min: "El peor", max: "El mejor", deckKey: 'normal' },
    { topic: "Personas para representarte en un juicio", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Cosas para hacer en un restaurante", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Cosas que quieres que pasen en 10 años", min: "Lo menos deseado", max: "Lo más deseado", deckKey: 'normal' },
    { topic: "Trabajos/profesiones", min: "El más fácil", max: "El más difícil", deckKey: 'normal' },
    { topic: "Excusas por llegar tarde", min: "La peor excusa", max: "La mejor excusa", deckKey: 'normal' },
    { topic: "Cosas para hacer en grupo", min: "La menos emocionante", max: "La más emocionante", deckKey: 'normal' },
    { topic: "Cosas que hacer si te recibe la reina", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Indicadores de que alguien es viejo", min: "Lo menos indicador", max: "Lo más indicador", deckKey: 'normal' },
    { topic: "Indicadores de que alguien es joven", min: "Lo menos indicador", max: "Lo más indicador", deckKey: 'normal' },
    { topic: "Objetos que la gente posee", min: "Lo menos común", max: "Lo más común", deckKey: 'normal' },
    { topic: "Cosas que hacer si estás varado en una isla", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Objetos útiles en una pelea", min: "El menos útil", max: "El más útil", deckKey: 'normal' },
    { topic: "Cosas para hacer videos de reseñas", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Celebridades agradables", min: "La menos agradable", max: "La más agradable", deckKey: 'normal' },
    { topic: "Sabores de helado", min: "El peor", max: "El mejor", deckKey: 'normal' },
    { topic: "Personas históricas para cenar", min: "La peor opción", max: "La mejor opción", deckKey: 'normal' },
    { topic: "Cosas para desayunar", min: "El peor", max: "El mejor", deckKey: 'normal' },
    { topic: "Cosas que harías si pudieras viajar en el tiempo", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Lemas de vida", min: "El peor lema", max: "El mejor lema", deckKey: 'normal' },
    { topic: "Razones para estudiar medicina", min: "La peor razón", max: "La mejor razón", deckKey: 'normal' },
    { topic: "Cosas que has hecho", min: "La menos frecuente", max: "La más frecuente", deckKey: 'normal' },
    { topic: "Cosas que quieres que pasen en 300 años", min: "Lo menos deseado", max: "Lo más deseado", deckKey: 'normal' },
    { topic: "Cosas para hacer en un ascensor lleno", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Personajes ficticios para ser amigos", min: "El menos deseado", max: "El más deseado", deckKey: 'normal' },
    { topic: "Razones para escribir una carta fuerte", min: "La peor razón", max: "La mejor razón", deckKey: 'normal' },
    { topic: "Cosas que quieres que pasen en tu boda", min: "Lo menos deseado", max: "Lo más deseado", deckKey: 'normal' },
    { topic: "Cosas de ser un vampiro", min: "Lo peor", max: "Lo mejor", deckKey: 'normal' },
    { topic: "Razones para ser un supervillano", min: "La peor razón", max: "La mejor razón", deckKey: 'normal' },
    { topic: "Cosas para ver en un escenario", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Cosas para poner en tu mansión", min: "La menos práctica", max: "La más práctica", deckKey: 'normal' },
    { topic: "Villanos ficticios intimidantes", min: "El menos intimidante", max: "El más intimidante", deckKey: 'normal' },
    { topic: "Uniformes obligatorios de trabajo", min: "El peor", max: "El mejor", deckKey: 'normal' },
    { topic: "Cosas para pescar", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Inversiones", min: "La menos estable", max: "La más estable", deckKey: 'normal' },
    { topic: "Cosas para llevar en la cartera", min: "Lo peor", max: "Lo mejor", deckKey: 'normal' },
    { topic: "Cosas que hacer si eres profesor", min: "La peor", max: "La mejor", deckKey: 'normal' },
    { topic: "Cosas que harías si fueras un pájaro", min: "Lo menos interesante", max: "Lo más interesante", deckKey: 'normal' },
  ],
  nsfw: [
    { topic: "Formas de salir impune de un asesinato", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas para desafiar a la Muerte y salvar tu vida", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Razones para empezar una pelea", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas para tatuarse", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas que hacer si la policía te detiene", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Formas de ganar dinero", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Personas, personajes o criaturas para ver teniendo sexo", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas por las que pelear durante un divorcio", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas que harías si estuvieras sin hogar y sin dinero", min: "Menos probable", max: "Más probable", deckKey: 'nsfw' },
    { topic: "Cosas que harías si supieras que vas a morir mañana", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas para poner en tu perfil de citas", min: "Menos exitoso", max: "Más exitoso", deckKey: 'nsfw' },
    { topic: "Cosas que hacer justo antes de renunciar a tu trabajo", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Formas de hacer llorar a un niño", min: "Menos cruel", max: "Más cruel", deckKey: 'nsfw' },
    { topic: "Cosas que harías si gobernaras el mundo", min: "Menos cruel", max: "Más cruel", deckKey: 'nsfw' },
    { topic: "Razones para tener sexo", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Formas de drogarse", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Peleas entre personajes o criaturas ficticias que te gustaría ver", min: "Menos querrías ver", max: "Más querrías ver", deckKey: 'nsfw' },
    { topic: "Formas en que podrías morir", min: "Menos probable", max: "Más probable", deckKey: 'nsfw' },
    { topic: "Cosas que podrían pasar en el más allá", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas que pasarían después de ganar un millón de dólares", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas o escenarios que causan estrés", min: "Menos estrés", max: "Más estrés", deckKey: 'nsfw' },
    { topic: "Formas de que acabe el mundo", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas que podrías hacer en una habitación", min: "Más probable", max: "Menos probable", deckKey: 'nsfw' },
    { topic: "Razones por las que alguien querría matarte", min: "Menos probable", max: "Más probable", deckKey: 'nsfw' },
    { topic: "Razones para que ocurra un disturbio o revuelta", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Celebridades femeninas", min: "Menos atractiva", max: "Más atractiva", deckKey: 'nsfw' },
    { topic: "Problemas sociales", min: "Menos importante", max: "Más importante", deckKey: 'nsfw' },
    { topic: "Películas de terror a las que sobrevivirías", min: "Menos probable sobrevivir", max: "Más probable sobrevivir", deckKey: 'nsfw' },
    { topic: "Criaturas de fantasía con las que te gustaría tener sexo", min: "Menos querrías", max: "Más querrías", deckKey: 'nsfw' },
    { topic: "Cosas que te excitan o ponen cachondo", min: "Menos excita", max: "Más excita", deckKey: 'nsfw' },
    { topic: "Parejas de la vida real o ficción para unirte en un trío", min: "Menos querrías unirte", max: "Más querrías unirte", deckKey: 'nsfw' },
    { topic: "Lugares para esconder un cuerpo", min: "El peor", max: "El mejor", deckKey: 'nsfw' },
    { topic: "Crímenes más fáciles o difíciles de cometer", min: "Más fácil", max: "Menos fácil", deckKey: 'nsfw' },
    { topic: "Cosas para compartir en redes sociales", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Formas de responder a '¿Dónde te ves en 5 años?'", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas que hicieron tus padres mientras crecías", min: "La mejor", max: "La peor", deckKey: 'nsfw' },
    { topic: "Cosas que tu jefe podría decirte", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Razones para divorciarse", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Bebidas alcohólicas", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas para limpiarse el trasero", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Fetiches", min: "Más normal", max: "Más extraño", deckKey: 'nsfw' },
    { topic: "Rasgos de personalidad", min: "Menos atractivo", max: "Más atractivo", deckKey: 'nsfw' },
    { topic: "Escenarios porno", min: "Menos excitante", max: "Más excitante", deckKey: 'nsfw' },
    { topic: "Celebridades masculinas", min: "Menos atractivo", max: "Más atractivo", deckKey: 'nsfw' },
    { topic: "Cosas que harías si fueras la única persona en la Tierra", min: "Menos probable", max: "Más probable", deckKey: 'nsfw' },
    { topic: "Maldiciones mágicas para tu peor enemigo", min: "Menos cruel", max: "Más cruel", deckKey: 'nsfw' },
    { topic: "Formas de proponer matrimonio", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas que indican que alguien es varón", min: "Menos probable", max: "Más probable", deckKey: 'nsfw' },
    { topic: "Cosas que indican que alguien es mujer", min: "Menos probable", max: "Más probable", deckKey: 'nsfw' },
    { topic: "Cosas que pasaron en el instituto", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Lugares para tirarse un pedo ruidoso", min: "El mejor", max: "El peor", deckKey: 'nsfw' },
    { topic: "Cosas que harías si pudieras volverte invisible", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas que hacer en una primera cita", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas que hacer con un dildo", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas para usar como lubricante", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas que aprender sobre tus padres", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas que hacer si encuentras un cuerpo muerto", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Excusas para engañar a tu pareja", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas que querrías besar", min: "Menos querrías besar", max: "Más querrías besar", deckKey: 'nsfw' },
    { topic: "Partes de una convención furry", min: "Menos disfrutable", max: "Más disfrutable", deckKey: 'nsfw' },
    { topic: "Cosas de las que tu pareja podría disfrazarse", min: "Menos sexy", max: "Más sexy", deckKey: 'nsfw' },
    { topic: "Cosas que hacer en un apocalipsis zombi", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Formas de romper con alguien", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas que indican que un hombre es gay", min: "Menos probable", max: "Más probable", deckKey: 'nsfw' },
    { topic: "Cosas que indican que una mujer es lesbiana", min: "Menos probable", max: "Más probable", deckKey: 'nsfw' },
    { topic: "Cosas que adoraría un culto", min: "Menos probable", max: "Más probable", deckKey: 'nsfw' },
    { topic: "Preguntas para hacer en una primera cita", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Formas de tener sexo", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas para describir como 'sexy'", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Formas de describir el rendimiento sexual de alguien", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas importantes al organizar una orgía", min: "Menos importante", max: "Más importante", deckKey: 'nsfw' },
    { topic: "Cosas que hacer en un club de striptease", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Formas de llamar la atención de todos", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas peores que ser pateado en los testículos", min: "Más comparable", max: "Menos comparable", deckKey: 'nsfw' },
    { topic: "Cosas que podrías decir sobre alguien", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Razones para abandonar la escuela", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas que te disgustan", min: "Menos disgusta", max: "Más disgusta", deckKey: 'nsfw' },
    { topic: "Formas de imponer tu dominio", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Lugares para orinar", min: "El peor", max: "El mejor", deckKey: 'nsfw' },
    { topic: "Cosas sobre las que mentir", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Razones para no tener sexo nunca", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas fáciles o difíciles de robar", min: "Más fácil", max: "Más difícil", deckKey: 'nsfw' },
    { topic: "Personas fáciles o difíciles de asesinar", min: "Más fácil", max: "Más difícil", deckKey: 'nsfw' },
    { topic: "Formas de morir", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas para buscar en Google", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Cosas fáciles o difíciles de contar a tus padres", min: "Más fácil", max: "Más difícil", deckKey: 'nsfw' },
    { topic: "Cosas que hacer desnudo", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Apodos para tus genitales", min: "El peor", max: "El mejor", deckKey: 'nsfw' },
    { topic: "Cosas que causan dolor", min: "Menos dolor", max: "Más dolor", deckKey: 'nsfw' },
    { topic: "Cosas para romper", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
    { topic: "Lugares para ir a nadar", min: "El peor", max: "El mejor", deckKey: 'nsfw' },
    { topic: "Razones para casarse", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Formas de conciliar el sueño", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Películas para hacer una parodia porno", min: "La peor", max: "La mejor", deckKey: 'nsfw' },
    { topic: "Cosas que harías por $100", min: "Más fácil", max: "Más difícil", deckKey: 'nsfw' },
    { topic: "Cosas que hacer en internet", min: "Menos entretenido", max: "Más entretenido", deckKey: 'nsfw' },
    { topic: "Apodos para tener", min: "El peor", max: "El mejor", deckKey: 'nsfw' },
    { topic: "Personajes de ficción con vidas fáciles o difíciles", min: "Más fácil", max: "Más difícil", deckKey: 'nsfw' },
    { topic: "Problemas que deben ser resueltos por la humanidad", min: "Menos importante", max: "Más importante", deckKey: 'nsfw' },
    { topic: "Cosas para usar para chantajear a alguien", min: "Lo peor", max: "Lo mejor", deckKey: 'nsfw' },
  ],
  anime: [
    { topic: "Razones para volverse un 'chico malo' en el anime", min: "La peor razón", max: "La mejor razón", deckKey: 'anime' },
    { topic: "Poderes de anime más o menos inútiles en la vida real", min: "Menos inútil", max: "Más inútil", deckKey: 'anime' },
    { topic: "Protagonistas de anime según la probabilidad de gritar el nombre de su ataque", min: "Menos probable", max: "Más probable", deckKey: 'anime' },
    { topic: "Formas de obtener un power-up repentino", min: "La peor forma", max: "La mejor forma", deckKey: 'anime' },
    { topic: "Personajes de anime según su probabilidad de sobrevivir al final", min: "Menos probable", max: "Más probable", deckKey: 'anime' },
    { topic: "Trabajos a tiempo parcial para un estudiante de anime", min: "El peor trabajo", max: "El mejor trabajo", deckKey: 'anime' },
    { topic: "Animes con diseños de personajes más o menos icónicos", min: "Menos icónicos", max: "Más icónicos", deckKey: 'anime' },
    { topic: "Peligros del mundo Pokémon", min: "Menos serios", max: "Más serios", deckKey: 'anime' },
    { topic: "Formas en que un isekai podría transportarte a otro mundo", min: "La peor forma", max: "La mejor forma", deckKey: 'anime' },
    { topic: "Rivalidades de anime según su nivel de amistad", min: "Menos amistosa", max: "Más amistosa", deckKey: 'anime' },
    { topic: "Comidas de anime que te gustaría probar", min: "Menos querrías probar", max: "Más querrías probar", deckKey: 'anime' },
    { topic: "Peleas de anime según su nivel de estrategia", min: "Más estratégica", max: "Menos estratégica", deckKey: 'anime' },
    { topic: "Mascotas de anime según su utilidad en combate", min: "Menos útil", max: "Más útil", deckKey: 'anime' },
    { topic: "Formas de morir dentro de un mecha", min: "La peor forma", max: "La mejor forma", deckKey: 'anime' },
    { topic: "Géneros de anime según lo rápido que enganchan desde el primer episodio", min: "Menos te engancha", max: "Más te engancha", deckKey: 'anime' },
    { topic: "Villanos de anime según su complejidad moral", min: "Menos complejo", max: "Más complejo", deckKey: 'anime' },
    { topic: "Armas de anime según su realismo", min: "Más realista", max: "Menos realista", deckKey: 'anime' },
    { topic: "Frases que un protagonista diría antes de derrotar al jefe final", min: "La peor frase", max: "La mejor frase", deckKey: 'anime' },
    { topic: "Personajes tsundere según cuánto 'dere' muestran al final", min: "Menos dere", max: "Más dere", deckKey: 'anime' },
    { topic: "Lugares emblemáticos de anime según su peligrosidad al visitar", min: "Menos peligroso", max: "Más peligroso", deckKey: 'anime' },
    { topic: "Formas de convertirse en un shinigami", min: "La peor forma", max: "La mejor forma", deckKey: 'anime' },
    { topic: "Héroes de shonen según su obsesión con la comida", min: "Menos obsesionado", max: "Más obsesionado", deckKey: 'anime' },
    { topic: "Criaturas gigantes de anime según lo aterradoras que son", min: "Menos aterradora", max: "Más aterradora", deckKey: 'anime' },
    { topic: "Tropos de anime que te aburren", min: "Menos me aburre", max: "Más me aburre", deckKey: 'anime' },
    { topic: "Tipos de escuelas en el anime según su probabilidad de ser destruidas", min: "Menos propensa", max: "Más propensa", deckKey: 'anime' },
    { topic: "Formas de ocultar tu identidad secreta", min: "La peor forma", max: "La mejor forma", deckKey: 'anime' },
    { topic: "Finales de anime según satisfacción", min: "Más satisfactorio", max: "Menos satisfactorio", deckKey: 'anime' },
    { topic: "Personajes de anime según su tendencia a reaccionar de forma exagerada", min: "Menos propenso", max: "Más propenso", deckKey: 'anime' },
    { topic: "Lugares para un enfrentamiento épico", min: "El peor lugar", max: "El mejor lugar", deckKey: 'anime' },
    { topic: "Animes deportivos según su apego a la física real", min: "Más real", max: "Menos real", deckKey: 'anime' },
    { topic: "Openings de anime según lo pegadizos que son", min: "Menos pegadiza", max: "Más pegadiza", deckKey: 'anime' },
    { topic: "Mascotas magical girl según su confiabilidad", min: "Más confiable", max: "Menos confiable", deckKey: 'anime' },
    { topic: "Escenas de flashback según su importancia para la trama", min: "Menos necesaria", max: "Más necesaria", deckKey: 'anime' },
    { topic: "Mentores de anime según su nivel de exigencia", min: "Menos estricto", max: "Más estricto", deckKey: 'anime' },
    { topic: "Razones para que un personaje use traje de baño en un episodio de relleno", min: "La peor razón", max: "La mejor razón", deckKey: 'anime' },
    { topic: "Personajes que usan espadas según su probabilidad de romperlas", min: "Más propenso", max: "Menos propenso", deckKey: 'anime' },
    { topic: "Transformaciones de personaje", min: "La peor transformación", max: "La mejor transformación", deckKey: 'anime' },
    { topic: "Objetos de anime según su valor en el mercado negro", min: "Menos valioso", max: "Más valioso", deckKey: 'anime' },
    { topic: "Estilos de dibujo de anime según nivel de detalle", min: "Menos detallado", max: "Más detallado", deckKey: 'anime' },
    { topic: "Formas de formar un equipo en el anime", min: "La peor forma", max: "La mejor forma", deckKey: 'anime' },
    { topic: "Clichés de anime slice of life según su nivel de reconfortación", min: "Menos reconfortante", max: "Más reconfortante", deckKey: 'anime' },
    { topic: "Formas de resucitar a un personaje", min: "La peor forma", max: "La mejor forma", deckKey: 'anime' },
    { topic: "Personajes genios según su probabilidad de volverse locos", min: "Menos propenso", max: "Más propenso", deckKey: 'anime' },
    { topic: "Animes según reconocimiento mundial", min: "Menos reconocido", max: "Más reconocido", deckKey: 'anime' },
    { topic: "Voces para un narrador de anime", min: "La peor voz", max: "La mejor voz", deckKey: 'anime' },
    { topic: "Ataques definitivos según su efectividad", min: "Más efectivo", max: "Menos efectivo", deckKey: 'anime' },
    { topic: "Razones para que un personaje lleve una máscara", min: "Menos justificada", max: "Más justificada", deckKey: 'anime' },
    { topic: "Formas de terminar con un cliffhanger", min: "La peor manera", max: "La mejor manera", deckKey: 'anime' },
    { topic: "Protagonistas según cuán OP son al inicio", min: "Menos op", max: "Más op", deckKey: 'anime' },
    { topic: "Frases de despedida para un villano derrotado", min: "La peor frase", max: "La mejor frase", deckKey: 'anime' },
    { topic: "Frutas del Diablo según su utilidad en la vida real", min: "Menos útil", max: "Más útil", deckKey: 'anime' },
    { topic: "Pokémon en la vida real según su utilidad diaria", min: "Menos útil", max: "Más útil", deckKey: 'anime' },
    { topic: "Objetos de anime que querrías tener en la vida real", min: "Menos deseado", max: "Más deseado", deckKey: 'anime' },
    { topic: "Tipos de magia en anime según su practicidad real", min: "Menos práctica", max: "Más práctica", deckKey: 'anime' },
    { topic: "Usuarios de ki/chi según su control energético", min: "Menos controlado", max: "Más controlado", deckKey: 'anime' },
    { topic: "Arcos de entrenamiento en anime según su intensidad", min: "Menos intenso", max: "Más intenso", deckKey: 'anime' },
    { topic: "Protagonistas de shonen según su capacidad de liderazgo", min: "Menos líder", max: "Más líder", deckKey: 'anime' },
    { topic: "Transformaciones de shonen según su impacto visual", min: "Menos impactante", max: "Más impactante", deckKey: 'anime' },
    { topic: "Espadas legendarias de anime según su poder", min: "Menos poderosa", max: "Más poderosa", deckKey: 'anime' },
    { topic: "Invocaciones de anime según su utilidad en combate", min: "Menos útil", max: "Más útil", deckKey: 'anime' },
    { topic: "Clases de RPG en anime según su versatilidad", min: "Menos versátil", max: "Más versátil", deckKey: 'anime' },
    { topic: "Doctores o sanadores de anime según efectividad", min: "Menos efectivo", max: "Más efectivo", deckKey: 'anime' },
    { topic: "Villanos de anime según su nivel de carisma", min: "Menos carismático", max: "Más carismático", deckKey: 'anime' },
    { topic: "Animales fantásticos de anime según su domesticabilidad", min: "Menos domesticable", max: "Más domesticable", deckKey: 'anime' },
    { topic: "Técnicas prohibidas de anime según el riesgo al usarlas", min: "Menos riesgosa", max: "Más riesgosa", deckKey: 'anime' },
    { topic: "Mechas de anime según facilidad para pilotearlos", min: "Más difícil", max: "Más fácil", deckKey: 'anime' },
    { topic: "Equipos de anime según su trabajo en conjunto", min: "Peor trabajo en equipo", max: "Mejor trabajo en equipo", deckKey: 'anime' },
    { topic: "Antiheroes de anime según su grado de moral gris", min: "Menos gris", max: "Más gris", deckKey: 'anime' },
    { topic: "Mentores de anime según sabiduría práctica", min: "Menos sabio", max: "Más sabio", deckKey: 'anime' },
    { topic: "Arcos argumentales en anime según su complejidad", min: "Menos complejo", max: "Más complejo", deckKey: 'anime' },
  ],
};

// ==========================================
// UTILIDADES
// ==========================================

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// ==========================================
// HOOK
// ==========================================

const useDynamicFontSize = (initialSize, fallbackSize, contentRef, topic) => {
  const [fontSizeClass, setFontSizeClass] = useState(initialSize);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const check = () => {
      setFontSizeClass(initialSize);
      requestAnimationFrame(() => {
        if (el.scrollHeight > el.clientHeight) {
          setFontSizeClass(fallbackSize);
        }
      });
    };

    const observer = new ResizeObserver(check);
    observer.observe(el);
    check();

    return () => observer.disconnect();
  // contentRef.current is stable — intentionally omitted
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topic, initialSize, fallbackSize]);

  return fontSizeClass;
};

// ==========================================
// COMPONENTES
// ==========================================

const MenuCard = ({ children, headerImage = null }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
    {headerImage && (
      <div className="flex justify-center mb-6">
        <img src={headerImage} alt="Header" className="w-48 h-auto object-contain" />
      </div>
    )}
    {children}
  </div>
);

const CheckboxBtn = ({ label, icon: Icon, checked, onChange, deckKey }) => {
  const styles = DECK_STYLES[deckKey];
  return (
    <button
      onClick={onChange}
      className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 mb-3
        ${checked ? styles.checkbox.active : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${checked ? styles.checkbox.iconBg : 'bg-gray-100'}`}>
          <Icon size={20} />
        </div>
        <span className="font-medium text-lg">{label}</span>
      </div>
      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center
        ${checked ? styles.checkbox.check : 'border-gray-300'}`}>
        {checked && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </button>
  );
};

const ActiveDecksIconDisplay = ({ selectedDecks }) => (
  <div className="flex items-center justify-end gap-1.5 mt-1">
    {selectedDecks.normal && <Layers size={18} className="text-red-500" title="Mazo Normal" />}
    {selectedDecks.nsfw && <Flame size={18} className="text-lime-500" title="Mazo +18 / NSFW" />}
    {selectedDecks.anime && <Tv size={18} className="text-blue-500" title="Mazo Anime / Geek" />}
  </div>
);

// ==========================================
// APP
// ==========================================

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [selectedDecks, setSelectedDecks] = useState({ normal: true, nsfw: false, anime: false });
  const [currentCard, setCurrentCard] = useState(null);
  const [isScreenTransitioning, setIsScreenTransitioning] = useState(false);

  const [swipeStartX, setSwipeStartX] = useState(0);
  const [swipeOffsetX, setSwipeOffsetX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardOpacity, setCardOpacity] = useState(1);

  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const SWIPE_THRESHOLD = 80;
  const TRANSITION_DURATION = 300;
  const transitionTimeoutRef = useRef(null);

  const BACKGROUND_IMAGE_URL = "https://i.imgur.com/LT7Y0xW.png";
  const HEADER_LOGO_URL = "https://i.imgur.com/KPsnD3m.png";
  const QUESTION_BLOCK_BG_URL = "https://i.imgur.com/Rb3ZEh8.png";

  const contentRef = useRef(null);
  const INITIAL_FONT_SIZE = 'text-2xl sm:text-3xl md:text-3xl';
  const FALLBACK_FONT_SIZE = 'text-lg sm:text-xl md:text-xl';

  const topicFontSizeClass = useDynamicFontSize(
    INITIAL_FONT_SIZE,
    FALLBACK_FONT_SIZE,
    contentRef,
    currentCard?.topic
  );

  // currentCardIndex >= shuffledDeck.length means all cards have been shown
  const isDeckFinished = shuffledDeck.length > 0 && currentCardIndex >= shuffledDeck.length;

  const cardStyles = currentCard?.deckKey ? DECK_STYLES[currentCard.deckKey] : DECK_STYLES.normal;
  const CurrentIcon = currentCard?.deckKey ? DECK_ICONS[currentCard.deckKey] : Sparkles;

  const generateCard = (exitDirection = 'left') => {
    if (currentCardIndex >= shuffledDeck.length) return;

    const newCardData = shuffledDeck[currentCardIndex];
    if (!newCardData) return;

    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);

    const exitOffset = exitDirection === 'right' ? window.innerWidth : -window.innerWidth;
    setSwipeOffsetX(exitOffset);
    setCardOpacity(0);

    transitionTimeoutRef.current = setTimeout(() => {
      const entryOffset = exitDirection === 'right' ? window.innerWidth : -window.innerWidth;

      setCurrentCard(newCardData);
      setCurrentCardIndex(prev => prev + 1);
      setSwipeOffsetX(-entryOffset);
      setCardOpacity(0);
      setSwipeStartX(0);
      setIsDragging(false);

      setTimeout(() => {
        setSwipeOffsetX(0);
        setCardOpacity(1);
      }, 50);
    }, TRANSITION_DURATION);
  };

  const handleScreenChange = (newScreen, callback = () => {}) => {
    setIsScreenTransitioning(true);
    setTimeout(() => {
      setScreen(newScreen);
      callback();
      setTimeout(() => setIsScreenTransitioning(false), 50);
    }, 500);
  };

  const startGame = () => {
    if (!canPlay) return;

    let combined = [];
    if (selectedDecks.normal) combined = [...combined, ...DATA_DECKS.normal];
    if (selectedDecks.nsfw) combined = [...combined, ...DATA_DECKS.nsfw];
    if (selectedDecks.anime) combined = [...combined, ...DATA_DECKS.anime];
    if (combined.length === 0) combined = DATA_DECKS.normal;

    const shuffled = shuffleArray(combined);
    setShuffledDeck(shuffled);
    setCurrentCardIndex(1);

    handleScreenChange('game', () => {
      setCurrentCard(shuffled[0] ?? { topic: "Mazo vacío", min: "Elige temas", max: "en el menú", deckKey: 'normal' });
    });
  };

  const handleNextCardClick = () => {
    if (isDeckFinished) {
      startGame();
    } else {
      generateCard('left');
    }
  };

  const returnToMenu = () => {
    setShuffledDeck([]);
    setCurrentCardIndex(0);
    setSwipeStartX(0);
    setSwipeOffsetX(0);
    setCardOpacity(1);
    setIsDragging(false);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    handleScreenChange('menu');
  };

  const handleStart = (clientX) => {
    if (swipeOffsetX === 0 && cardOpacity === 1) {
      setSwipeStartX(clientX);
      setIsDragging(true);
    }
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const offset = clientX - swipeStartX;
    setSwipeOffsetX(offset);
    setCardOpacity(Math.max(0, 1 - Math.abs(offset) / (window.innerWidth / 2)));
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(swipeOffsetX) > SWIPE_THRESHOLD) {
      if (isDeckFinished) {
        startGame();
      } else {
        generateCard(swipeOffsetX > 0 ? 'right' : 'left');
      }
    } else {
      setSwipeStartX(0);
      setSwipeOffsetX(0);
      setCardOpacity(1);
    }
  };

  const toggleDeck = (deckKey) => {
    setSelectedDecks(prev => {
      const next = { ...prev, [deckKey]: !prev[deckKey] };
      return Object.values(next).some(Boolean) ? next : prev;
    });
  };

  const canPlay = Object.values(selectedDecks).some(Boolean);
  const remainingCount = Math.max(0, shuffledDeck.length - currentCardIndex);

  const totalSelectedCards = Object.keys(selectedDecks).reduce(
    (total, key) => (selectedDecks[key] ? total + DATA_DECKS[key].length : total),
    0
  );

  const activeDeckLabels = Object.keys(selectedDecks)
    .filter(key => selectedDecks[key])
    .map(key => DECK_DISPLAY_NAMES[key].split(': ')[1]);

  const screenTransitionClasses = isScreenTransitioning
    ? 'opacity-0 scale-95 rotate-3'
    : 'opacity-100 scale-100 rotate-0';

  const cardStyle = {
    transform: `translateX(${swipeOffsetX}px)`,
    opacity: cardOpacity,
    transition: isDragging
      ? 'transform 0s, opacity 0s'
      : `transform ${TRANSITION_DURATION}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${TRANSITION_DURATION}ms ease-in-out`,
  };

  return (
    <div
      className="h-screen font-sans text-slate-800 flex items-center justify-center bg-slate-950"
      style={{
        backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60" />

      <div className="relative z-10 w-full flex items-center justify-center h-full px-4 py-16 md:py-32">

        {/* MENÚ */}
        {screen === 'menu' && (
          <div className={`w-full flex justify-center items-center transition-all duration-500 ease-in-out transform ${screenTransitionClasses}`}>
            <MenuCard headerImage={HEADER_LOGO_URL}>
              <p className="text-gray-500 mb-6 text-center">Selecciona los paquetes de preguntas con los que quieres jugar.</p>

              <div className="space-y-2 mb-8">
                <CheckboxBtn
                  label={`Normal / Casual (${DATA_DECKS.normal.length} Temas)`}
                  icon={Layers}
                  checked={selectedDecks.normal}
                  onChange={() => toggleDeck('normal')}
                  deckKey="normal"
                />
                <CheckboxBtn
                  label={`NSFW / +18 (${DATA_DECKS.nsfw.length} Temas)`}
                  icon={Flame}
                  checked={selectedDecks.nsfw}
                  onChange={() => toggleDeck('nsfw')}
                  deckKey="nsfw"
                />
                <CheckboxBtn
                  label={`Anime / Geek (${DATA_DECKS.anime.length} Temas)`}
                  icon={Tv}
                  checked={selectedDecks.anime}
                  onChange={() => toggleDeck('anime')}
                  deckKey="anime"
                />
              </div>

              <button
                onClick={startGame}
                disabled={!canPlay}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg
                  ${canPlay
                    ? 'bg-red-600 hover:bg-red-700 text-white transform hover:scale-[1.02]'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                <Play size={24} fill="currentColor" />
                JUGAR AHORA
              </button>

              {activeDeckLabels.length > 0 && (
                <p className="mt-4 text-center text-sm text-gray-400">
                  Mazos activos: {activeDeckLabels.join(' + ')}. Total: {totalSelectedCards} cartas
                </p>
              )}
            </MenuCard>
          </div>
        )}

        {/* JUEGO */}
        {screen === 'game' && currentCard && (
          <div className={`w-full h-full max-w-lg flex flex-col relative
            max-h-[95vh] md:max-h-[680px] landscape:max-h-[500px]
            transition-all duration-500 ease-in-out transform ${screenTransitionClasses}`}
          >
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-4 px-4">
              <button
                onClick={returnToMenu}
                className={`flex items-center gap-2 text-white ${cardStyles.backButton} font-medium py-2 px-3 rounded-lg hover:bg-white/10 transition-colors`}
              >
                <ArrowLeft size={20} />
                Menú
              </button>

              <div className="text-xs font-bold tracking-widest text-gray-400 uppercase text-right">
                <span className="inline-block mb-1">MAZOS ACTIVOS:</span>
                <ActiveDecksIconDisplay selectedDecks={selectedDecks} />
                <span className={isDeckFinished ? 'text-yellow-400' : 'text-gray-400'}>
                  QUEDAN: {remainingCount} / {shuffledDeck.length}
                </span>
              </div>
            </div>

            {/* Tarjeta */}
            <div
              className={`flex-1 bg-white rounded-2xl shadow-2xl border flex flex-col relative overflow-hidden cursor-grab active:cursor-grabbing
                ${isDeckFinished ? 'border-yellow-400 border-4' : 'border-slate-200'}`}
              style={cardStyle}
              onTouchStart={(e) => handleStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
              onTouchEnd={handleEnd}
              onMouseDown={(e) => handleStart(e.clientX)}
              onMouseMove={(e) => handleMove(e.clientX)}
              onMouseUp={handleEnd}
              onMouseLeave={() => isDragging && handleEnd()}
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${cardStyles.card.bar}`} />
              <div className={`absolute -right-10 -top-10 w-40 h-40 ${cardStyles.card.glow} rounded-full blur-3xl opacity-50 pointer-events-none`} />
              <div className="absolute -left-10 bottom-20 w-40 h-40 bg-pink-50 rounded-full blur-3xl opacity-50 pointer-events-none" />

              {/* Pregunta */}
              <div
                ref={contentRef}
                className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center relative z-0 py-5 md:py-7 overflow-y-hidden"
                style={{
                  backgroundImage: `url('${QUESTION_BLOCK_BG_URL}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'top',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <div className="absolute inset-0 bg-white/10 z-10" />

                <div className="relative z-20 flex flex-col items-center">
                  <div className={`mb-4 p-4 rounded-full shadow-xl shadow-black/20 ${cardStyles.card.icon}`}>
                    <CurrentIcon size={32} />
                  </div>

                  <p className="mt-0 mb-2 text-slate-500 text-sm font-bold uppercase tracking-wider">
                    {isDeckFinished ? '¡FIN DE LA PARTIDA!' : DECK_DISPLAY_NAMES[currentCard.deckKey] ?? 'TEMA ACTUAL'}
                  </p>

                  <h1 className={`${topicFontSizeClass} font-black text-slate-800 leading-tight`}>
                    {currentCard.topic}
                  </h1>
                </div>
              </div>

              {/* Escala */}
              <div className="mt-auto border-t border-slate-100 bg-slate-50/70 backdrop-blur-sm p-4 md:p-6 flex-shrink-0">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Mínimo</span>
                  <span className="text-xs font-bold text-green-500 uppercase tracking-wider">Máximo</span>
                </div>

                <div className="flex justify-between items-start mb-3">
                  <div className="text-xl font-black text-slate-700 leading-tight max-w-[45%]">{currentCard.min}</div>
                  <div className="text-right text-xl font-black text-slate-700 leading-tight max-w-[45%]">{currentCard.max}</div>
                </div>

                <div className="flex justify-between items-center h-8 mb-2">
                  <span className="text-3xl font-black text-red-500">001</span>
                  <span className="text-3xl font-black text-green-500">100</span>
                </div>

                <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-full w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 shadow-inner" />
                </div>
              </div>
            </div>

            {/* Botón siguiente */}
            <div className="mt-4 md:mt-6 px-4">
              <button
                onClick={handleNextCardClick}
                className={`w-full text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95
                  ${isDeckFinished ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-red-600 hover:bg-red-700'}`}
              >
                <RefreshCw size={24} className={isDeckFinished ? 'animate-spin' : ''} />
                {isDeckFinished ? 'REINICIAR MAZO COMPLETO' : 'SIGUIENTE TEMA'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
