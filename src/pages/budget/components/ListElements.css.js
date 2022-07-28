import styled from "styled-components"

export const List = styled.ul`
    padding: ${({theme}) => theme.spacing.xs}px;
`;

export const ParentCategoryElement = styled.li`
    padding: ${({theme}) => theme.spacing.xxs}px;
    background: ${({theme}) => theme.colors.gray.light};

    span {
        display: block;
        cursor: pointer;
    }
`;
