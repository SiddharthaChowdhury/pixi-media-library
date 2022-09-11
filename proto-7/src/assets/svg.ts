export type TypeSvgName = "home" | "search" | "bookmark" | "info" | "play";

export const svgPromise = (
  name: TypeSvgName,
  color: string,
  size: number = 20
) => {
  const svgs = {
    home: `<?xml version="1.0" encoding="iso-8859-1"?>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 331.242 331.242" style="enable-background:new 0 0 ${size} ${size};" xml:space="preserve">
            <path fill="${color}" d="M324.442,129.811l-41.321-33.677V42.275c0-6.065-4.935-11-11-11h-26c-6.065,0-11,4.935-11,11v14.737l-55.213-44.999
                c-3.994-3.254-9.258-5.047-14.822-5.047c-5.542,0-10.781,1.782-14.753,5.019L5.8,129.81c-6.567,5.351-6.173,10.012-5.354,12.314
                c0.817,2.297,3.448,6.151,11.884,6.151h19.791v154.947c0,11.058,8.972,20.053,20,20.053h62.5c10.935,0,19.5-8.809,19.5-20.053
                v-63.541c0-5.446,5.005-10.405,10.5-10.405h42c5.238,0,9.5,4.668,9.5,10.405v63.541c0,10.87,9.388,20.053,20.5,20.053h61.5
                c11.028,0,20-8.996,20-20.053V148.275h19.791c8.436,0,11.066-3.854,11.884-6.151C330.615,139.822,331.009,135.161,324.442,129.811z"
                />
            </svg>`,
    search: `<?xml version="1.0" encoding="iso-8859-1"?>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 183.792 183.792" style="enable-background:new 0 0 ${size} ${size};" xml:space="preserve">
            <path fill="${color}" d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22
                c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583
                c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0
                C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806
                c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25
                c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"/>
            </svg>`,

    bookmark: `<?xml version="1.0" encoding="iso-8859-1"?>
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 296.438 296.438" style="enable-background:new 0 0 ${size} ${size};" xml:space="preserve">
                <path fill="${color}" d="M227.275,0H69.829c-7.718,0-13.61,4.908-13.61,12.627v269.836c0,5.039,2.522,9.689,6.91,12.168s9.61,2.404,13.926-0.196
                    l71.481-49.381l71.474,49.381c4.316,2.6,9.241,2.675,13.629,0.196c4.387-2.479,6.581-7.128,6.581-12.168V12.627
                    C240.219,4.908,234.993,0,227.275,0z M148.552,119.055c-9.796,0-35.476-18.276-35.476-36.014c0-9.796,7.942-17.738,17.738-17.738
                    c9.796,0,17.738,7.942,17.738,17.738c0-9.796,7.942-17.738,17.738-17.738c9.796,0,17.738,7.942,17.738,17.738
                    C184.028,100.779,158.348,119.055,148.552,119.055z"/>
                </svg>
    `,
    info: `<?xml version="1.0" encoding="iso-8859-1"?>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 488.9 488.9" style="enable-background:new 0 0 ${size} ${size};" xml:space="preserve">
            <g>
                <g>
                    <path fill="${color}" d="M239.15,0c31.9,0,57.7,25.8,57.7,57.7s-25.8,57.7-57.7,57.7s-57.7-25.8-57.7-57.7S207.25,0,239.15,0z M291.65,151.6h-1.5
                        h-92.8h-3.4c-19,0-34.3,15.4-34.3,34.3l0,0c0,19,15.4,34.3,34.3,34.3h3.4v200h-37.7v68.7h169.6v-68.7h-37.5V151.6H291.65z"/>
                </g>
            </g>
            </svg>
            `,
    play: `<?xml version="1.0" encoding="iso-8859-1"?>
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 17.804 17.804" style="enable-background:new 0 0 ${size} ${size};" xml:space="preserve">
            <g>
                <g id="c98_play">
                    <path fill="${color}" d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313
                        c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04
                        c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"/>
                </g>
            </g>
            </svg>
            `,
  };

  return new Promise((resolve: (base64: string) => void, reject) => {
    const image = new Image();
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");

    image.onload = () => {
      context!.drawImage(image, 0, 0);

      resolve(canvas.toDataURL());
    };
    image.onerror = (e) => {
      reject(e);
    };
    image.src = `data:image/svg+xml;base64,${window.btoa(svgs[name])}`;
  });
};
