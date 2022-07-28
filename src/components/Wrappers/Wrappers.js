import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    max-width: 960px;
    padding-right: 10px;
    padding-left: 10px;
`;

export const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const PageWrapper = styled(Wrapper)`
    padding-top: 1rem;
    background-color: ${({theme}) => theme.colors.white.light};
`;

export const NavigationWrapper = styled(Wrapper)`
    display: flex;
    justify-content: space-between;
`;
