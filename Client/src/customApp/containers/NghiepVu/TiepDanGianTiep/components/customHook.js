import { useEffect, useState } from "react";

function useFullAddress(props) {
    const [data, setData] = useState(props);
    const [fullAddress, setFullAddress] = useState();
    const [chiTietDiaChi, setChiTietDiaChi] = useState();

    useEffect(() => {
        let name = data?.name || "";
        let value = data?.value || "";
        if (name === "soNha")
            setChiTietDiaChi((pre) => ({
                ...pre,
                soNha: value.trim(),
            }));
        if (name === "diaGioi") {
            let diaGioiStr = Object.values(value)
                .reverse()
                .filter((item) => item !== undefined)
                .join(", ");

            setChiTietDiaChi((pre) => ({
                ...pre,
                diaGioi: diaGioiStr,
            }));
        }
    }, [data]);

    useEffect(() => {
        let fullAddress = "";
        let soNha = chiTietDiaChi?.soNha || "";
        let diaGioi = chiTietDiaChi?.diaGioi || "";
        if (soNha && diaGioi) {
            fullAddress += soNha + ", " + diaGioi;
        } else {
            if (soNha) fullAddress += soNha;
            if (diaGioi) fullAddress += diaGioi;
        }
        setFullAddress(fullAddress);
    }, [chiTietDiaChi]);

    return [fullAddress, setData];
}

export { useFullAddress };
