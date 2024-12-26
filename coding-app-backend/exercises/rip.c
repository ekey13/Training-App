#include <unistd.h>

int ft_strlen(char *str)
{
    int i;

    i = 0;
    while (str[i] != '\0')
        i++;
    return (i);
}

int find_balance(char *str)
{
    int i = 0;
    int balance = 0;
    int open_par = 0;

    while (str[i] != '\0')
    {
        if (str[i] == '(')
            balance++;
        if (str[i] == ')')
        {
            balance--;
            if (balance == -1)
            {
                balance = 0;
                open_par++;
            }
        }
        i++;
    }
    return (balance + open_par);
}

void print_res(char *str)
{
    int i;
    i = 0;

    while (str[i] != '\0')
        write(1, &str[i++], 1);
    write(1, "\n", 1);
}

int count_spaces(char *str)
{
    int i = 0;
    int spaces = 0;

    while (str[i] != '\0')
    {
        if (str[i] == ' ')
            spaces++;
        i++;
    }
    return (spaces);
}

void rip(char *str, int i, int len, int balance)
{
    char tmp;

    if (find_balance(str) == 0)
    {
        if (count_spaces(str) == balance)
        {
            print_res(str);
            return;
        }
    }

    while (i < len)
    {
        tmp = str[i];
        str[i] = ' ';
        rip(str, i + 1, len, balance);
        str[i] = tmp;
        i++;
    }
}

int main(int argc, char **argv)
{
    int balance;
    int len;

    if (argc != 2)
        return (0);
    len = ft_strlen(argv[1]);
    balance = find_balance(argv[1]);
    if (balance == 0)
    {
        print_res(argv[1]);
        return (0);
    }
    rip(argv[1], 0, len, balance);
    return (0);
}