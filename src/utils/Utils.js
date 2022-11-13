export default class Utils {
    static orderArray(list, param, order, secondParam = '') {
        let data = [];
        try {
            if (!secondParam) {
                data = (list || []).sort((a, b) => {
                    return a[param].toLowerCase() > b[param].toLowerCase() ? order : -order;
                });
            } else {
                data = (list || []).sort((a, b) => {
                    return a[param][secondParam].toLowerCase() > b[param][secondParam].toLowerCase()
                        ? order
                        : -order;
                });
            }
        } catch (err) {
            data = list;
        }
        return data;
    };
}
