import React from 'react';
// import {Hr as ReactEmailHr} from "@react-email/hr";
// import {Tailwind} from "@react-email/tailwind";

interface HrProps {
    marginTop?: number;
    marginBottom?: number;
}

const Hr = ({marginTop = 26, marginBottom = 26} : HrProps) => {
    return (
        <hr
            style={{
                width: "100%",
                border: "none",
                borderTop: "1px solid #eaeaea",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgb(234,234,234)",
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                marginLeft: "0px",
                marginRight: "0px"
        }}
        />
    );

    // return (
    //     <Tailwind>
    //         <ReactEmailHr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full"/>
    //     </Tailwind>
    // );
};

export default Hr;