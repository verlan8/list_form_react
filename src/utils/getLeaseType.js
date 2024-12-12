// Вернуть значение аренда\продажа\субаренда

export default function getLeaseType(data, type) {
    if (data.lease === true) {
        return 'Аренда';
    } else if (data.sale === true) {
        return 'Продажа';
    } else if (data.sublease === true) {
        return 'Субаренда';
    }

    return null;
}
