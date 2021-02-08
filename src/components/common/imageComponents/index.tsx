import React from 'react';
import styled from 'styled-components';
import checkbox from '../../images/check.svg';

interface ImageProps {
    alt?: string;
    color?: string;
}

export const GreenCheckmark: React.FC<ImageProps> = ({ alt = 'green check mark' }) => <Image src={checkbox} alt={alt} />;

const Image = styled.img`
   width: 100%;
`;

interface ImageProps {
    color?: string;
    height?: string;
}

export const EnvelopeImg = ({ color = '#8c9da5', height = '20px', ...props }: ImageProps) => (
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{ fill: color, height }}
        {...props}
    >
        <g>
            <g>
                <g>
                    <path d="M10.688,95.156C80.958,154.667,204.26,259.365,240.5,292.01c4.865,4.406,10.083,6.646,15.5,6.646
                        c5.406,0,10.615-2.219,15.469-6.604c36.271-32.677,159.573-137.385,229.844-196.896c4.375-3.698,5.042-10.198,1.5-14.719
                        C494.625,69.99,482.417,64,469.333,64H42.667c-13.083,0-25.292,5.99-33.479,16.438C5.646,84.958,6.313,91.458,10.688,95.156z"
                    />
                    <path d="M505.813,127.406c-3.781-1.76-8.229-1.146-11.375,1.542C416.51,195.01,317.052,279.688,285.76,307.885
                        c-17.563,15.854-41.938,15.854-59.542-0.021c-33.354-30.052-145.042-125-208.656-178.917c-3.167-2.688-7.625-3.281-11.375-1.542
                        C2.417,129.156,0,132.927,0,137.083v268.25C0,428.865,19.135,448,42.667,448h426.667C492.865,448,512,428.865,512,405.333
                        v-268.25C512,132.927,509.583,129.146,505.813,127.406z"
                    />
                </g>
            </g>
        </g>
    </svg>
);

export const UserImg = ({ color = '#8c9da5', height = '20px', ...props }: ImageProps) => (
    <svg viewBox="-42 0 512 512.001" xmlns="http://www.w3.org/2000/svg" style={{ fill: color, height }} {...props}>
        <path d="m210.351562 246.632812c33.882813 0 63.21875-12.152343 87.195313-36.128906 23.96875-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.128906 87.195312 23.980469 23.96875 53.316406 36.125 87.191406 36.125zm-65.972656-189.292968c18.394532-18.394532 39.972656-27.335938 65.972656-27.335938 25.996094 0 47.578126 8.941406 65.976563 27.335938 18.394531 18.398437 27.339844 39.980468 27.339844 65.972656 0 26-8.945313 47.578125-27.339844 65.976562-18.398437 18.398438-39.980469 27.339844-65.976563 27.339844-25.992187 0-47.570312-8.945312-65.972656-27.339844-18.398437-18.394531-27.34375-39.976562-27.34375-65.976562 0-25.992188 8.945313-47.574219 27.34375-65.972656zm0 0" />
        <path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.3125-10.339844-7.808594-20.550781-13.375-30.335938-5.769532-10.15625-12.550782-19-20.160157-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.042969 5.339844-10.96875 0-22.085937-1.796876-33.042968-5.339844-11.210938-3.621094-20.300782-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.753906-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.609375 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.0625 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.777344-1.023438 19.953125-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.4375 23.730469 65.066406 23.730469h246.53125c26.621094 0 48.511719-7.984375 65.0625-23.730469 16.757813-15.945312 25.253906-37.589843 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm-44.90625 72.828125c-10.933594 10.40625-25.449218 15.464844-44.378906 15.464844h-246.527344c-18.933594 0-33.449218-5.058594-44.378906-15.460938-10.722656-10.207031-15.933594-24.140625-15.933594-42.585937 0-9.59375.316406-19.066407.949219-28.160157.617187-8.921874 1.878906-18.722656 3.75-29.136718 1.847656-10.285156 4.199219-19.9375 6.996094-28.675782 2.683593-8.378906 6.34375-16.675781 10.882812-24.667968 4.332031-7.617188 9.316407-14.152344 14.816407-19.417969 5.144531-4.925781 11.628906-8.957031 19.269531-11.980469 7.066406-2.796875 15.007812-4.328125 23.628906-4.558594 1.050781.558594 2.921875 1.625 5.953125 3.601563 6.167969 4.019531 13.277344 8.605469 21.136719 13.625 8.859375 5.648437 20.273437 10.75 33.910156 15.152344 13.941406 4.507812 28.160156 6.796875 42.273437 6.796875 14.113282 0 28.335938-2.289063 42.269532-6.792969 13.648437-4.410156 25.058594-9.507813 33.929687-15.164063 8.042969-5.140624 14.953125-9.59375 21.121094-13.617187 3.03125-1.972656 4.902344-3.042969 5.953125-3.601563 8.625.230469 16.566406 1.761719 23.636719 4.558594 7.636719 3.023438 14.121093 7.058594 19.265625 11.980469 5.5 5.261719 10.484375 11.796875 14.816406 19.421875 4.542969 7.988281 8.207031 16.289062 10.886719 24.660156 2.800781 8.75 5.15625 18.398438 7 28.675782 1.867187 10.433593 3.132812 20.238281 3.75 29.144531v.007812c.636719 9.058594.957031 18.527344.960937 28.148438-.003906 18.449219-5.214844 32.378906-15.9375 42.582031zm0 0" />
    </svg>
);

export const UserFilledImg = ({ color = '#8c9da5', height = '20px', ...props }: ImageProps) => (
    <svg viewBox="-42 0 512 512.002" xmlns="http://www.w3.org/2000/svg" style={{ fill: color, height }} {...props}>
        <path d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0" />
        <path d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0" />
    </svg>
);

export const PhoneImg = ({ color = '#8c9da5', height = '20px', ...props }: ImageProps) => (
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 503.604 503.604"
        style={{ fill: color, height }}
        {...props}
    >
        <g>
            <g>
                <path d="M337.324,0H167.192c-28.924,0-53.5,23.584-53.5,52.5v398.664c0,28.916,24.056,52.44,52.98,52.44l170.412-0.184
                         c28.92,0,52.58-23.528,52.58-52.448l0.248-398.5C389.908,23.452,366.364,0,337.324,0z M227.68,31.476h49.36
                         c4.336,0,7.868,3.52,7.868,7.868c0,4.348-3.532,7.868-7.868,7.868h-49.36c-4.348,0-7.868-3.52-7.868-7.868
                         C219.812,34.996,223.332,31.476,227.68,31.476z M198.02,33.98c2.916-2.912,8.224-2.952,11.136,0c1.46,1.456,2.324,3.5,2.324,5.588
                         c0,2.048-0.864,4.088-2.324,5.548c-1.452,1.46-3.504,2.32-5.548,2.32c-2.084,0-4.088-0.86-5.588-2.32
                         c-1.452-1.456-2.28-3.5-2.28-5.548C195.736,37.48,196.568,35.436,198.02,33.98z M250.772,488.008
                         c-12.984,0-23.544-10.568-23.544-23.548c0-12.984,10.56-23.548,23.544-23.548s23.544,10.564,23.544,23.548
                         C274.316,477.44,263.752,488.008,250.772,488.008z M365.488,424.908H141.232V74.756h224.256V424.908z"
                />
            </g>
        </g>
    </svg>

);

export const AvatarPlaceholder = ({ color, ...props }: ImageProps) => (

    <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{ fill: color, width: '100%' }}
        {...props}
    >
        <g>
            <g>
                <path d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
c59.551,0,108,48.448,108,108S315.551,256,256,256z"
                />
            </g>
        </g>
    </svg>

);
export const DisabledImage = ({ color = '#D9553E', ...props }:ImageProps) => (
    <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{ fill: color, width: '100%' }}
        {...props}
    >
        <path
            className="st0"
            d="M256,0C114.8,0,0,114.8,0,256s114.8,256,256,256s256-114.8,256-256S397.2,0,256,0z M64,256
 c0-41.4,13.3-79.7,35.7-111.1l267.4,267.4C335.7,434.7,297.4,448,256,448C150.1,448,64,361.9,64,256z M412.3,367.1L144.9,99.7
 C176.3,77.3,214.6,64,256,64c105.9,0,192,86.1,192,192C448,297.4,434.7,335.7,412.3,367.1L412.3,367.1z"
        />
    </svg>

);

export const NextButton = ({ color = '#6CB91C', isReverse, ...props }:ImageProps) => (
    <svg
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 300 300"
        style={{ fill: color, width: '30px' }}
        {...props}
    >

        <g>
            <g>
                <path
                    style={{ fill: color }}
                    d="M150,0C67.2,0,0,67.2,0,150c0,82.8,67.2,150,150,150s150-67.2,150-150C300,67.2,232.8,0,150,0z M195.7,160.2
 c-0.7,0.7-1.5,1.3-2.4,1.9L137,218.3c-2.7,2.7-6.3,4.1-9.9,4.1s-7.2-1.4-9.9-4.1c-5.5-5.5-5.5-14.3,0-19.8l48.5-48.5l-48.3-48.3
 c-5.5-5.5-5.5-14.3,0-19.8c5.5-5.5,14.3-5.5,19.8,0l56,56c0.8,0.5,1.6,1.2,2.4,1.9c2.8,2.8,4.1,6.5,4.1,10.1
 C199.9,153.7,198.5,157.4,195.7,160.2z"
                />
            </g>
        </g>
    </svg>

);

export const CalendarImg = ({ color = '#595959', ...props }:ImageProps) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{ fill: color, width: '100%' }}
        {...props}
    >
        <g>
            <path
                d="m446 40h-46v-24c0-8.836-7.163-16-16-16s-16 7.164-16 16v24h-224v-24c0-8.836-7.163-16-16-16s-16 7.164-16
                 16v24h-46c-36.393 0-66 29.607-66 66v340c0 36.393 29.607 66 66 66h380c36.393 0 66-29.607 66-66v-340c0-36.393-29.607-66-66-66zm34
                406c0 18.778-15.222 34-34 34h-380c-18.778 0-34-15.222-34-34v-265c0-2.761 2.239-5 5-5h438c2.761 0 5 2.239 5 5z"
            />
        </g>
    </svg>

);

export const AvatarPlaceholderImg = ({ color = 'white', ...props }:ImageProps) => (
    <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{ fill: color, width: '100%' }}
        {...props}
    >
        <g>
            <g>
                <path d="M437.02,330.98c-27.883-27.882-61.071-48.523-97.281-61.018C378.521,243.251,404,198.548,404,148
            C404,66.393,337.607,0,256,0S108,66.393,108,148c0,50.548,25.479,95.251,64.262,121.962
            c-36.21,12.495-69.398,33.136-97.281,61.018C26.629,379.333,0,443.62,0,512h40c0-119.103,96.897-216,216-216s216,96.897,216,216
            h40C512,443.62,485.371,379.333,437.02,330.98z M256,256c-59.551,0-108-48.448-108-108S196.449,40,256,40
            c59.551,0,108,48.448,108,108S315.551,256,256,256z"
                />
            </g>
        </g>
    </svg>
);

export const RunningPlaceholderImg = ({ color = 'grey', ...props }:ImageProps) => (
    <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 512 512"
        style={{ fill: color, width: '60%', height: '100%' }}
        {...props}
    >
        <g>
            <g>
                <path d="M121,68.5H45c-8.291,0-15,6.709-15,15s6.709,15,15,15h76c8.291,0,15-6.709,15-15S129.291,68.5,121,68.5z" />
            </g>
        </g>
        <g>
            <g>
                <path d="M121,188.5H45c-8.291,0-15,6.709-15,15s6.709,15,15,15h76c8.291,0,15-6.709,15-15S129.291,188.5,121,188.5z" />
            </g>
        </g>
        <g>
            <g>
                <path d="M91,128.5H15c-8.291,0-15,6.709-15,15s6.709,15,15,15h76c8.291,0,15-6.709,15-15S99.291,128.5,91,128.5z" />
            </g>
        </g>
        <g>
            <g>
                <path d="M482,203.5h-91v-60c0-26.346-32.229-40.218-51.22-21.202L219.789,242.289c-11.719,11.719-11.719,30.703,0,42.422
l68.789,68.789l-83.789,83.789c-11.719,11.719-11.719,30.703,0,42.422c11.718,11.718,30.703,11.719,42.422,0l105-105
c11.719-11.719,11.719-30.703,0-42.422L283.422,263.5L331,215.922V233.5c0,16.567,13.433,30,30,30h121c16.567,0,30-13.433,30-30
S498.567,203.5,482,203.5z"
                />
            </g>
        </g>
        <g>
            <g>
                <path d="M280.14,51.04c-11.924-7.925-27.744-6.357-37.852,3.75l-82.5,82.5c-11.719,11.719-11.719,30.703,0,42.422
s30.704,11.718,42.423-0.001l65.112-65.112l21.934,15.8l29.306-29.306c4.902-4.902,10.684-8.707,17.007-11.678L280.14,51.04z"
                />
            </g>
        </g>
        <g>
            <g>
                <path d="M198.578,305.922c-7.601-7.601-12.675-16.956-15.35-27.072L24.789,437.289c-11.719,11.719-11.719,30.703,0,42.422
c11.718,11.718,30.703,11.719,42.422,0l152.578-152.578L198.578,305.922z"
                />
            </g>
        </g>
        <g>
            <g>
                <circle cx="406" cy="68.5" r="45" />
            </g>
        </g>
        <g />
    </svg>
);
