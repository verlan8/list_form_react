// Сделать первую букву прописной

export default function CapitalizeFirstLetter(word) {
    if (!word) return null;

    return word.charAt(0).toUpperCase() + word.slice(1);
};
