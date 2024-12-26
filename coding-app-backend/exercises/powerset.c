// powerset.c
// allowed functions : atoi, fprintf, malloc, calloc, realloc, free, stdout, stderr, write

// Write a program that will take as argument an integer n followed by a set of integer.
// Your program should display all the subset of s whose sum of elements is n.
// The order of the lines is not important, but the order if the element in  a subset is.
// You must not have any duplicates in case of a malloc problem exit 1;

#include <stdio.h>
#include <stdlib.h>

void print_subset(int *subset, int size)
{
    int i;
    i = 0;
    while (i < size)
    {
        fprintf(stdout, "%d", subset[i]);
        if (i < size - 1)
            fprintf(stdout, ", ");
        i++;
    }
    fprintf(stdout, "\n");
}
void find_subset(int *arr, int arr_size, int target_sum)
{
    int found;
    int total_subsets;
    int subset_mask;
    int sum;
    int subset_size;
    int *subset;
    int i;
    found = 0;
    total_subsets = 1 << arr_size;
    subset_mask = 0;
    while (subset_mask < total_subsets)
    {
        sum = 0;
        subset_size = 0;
        subset = (int *)malloc(arr_size * sizeof(int));
        if (subset == NULL)
        {
            fprintf(stderr, "malloc failed");
            exit(1);
        }
        i = 0;
        while (i < arr_size)
        {
            if (subset_mask & (1 << i))
            {
                sum += arr[i];
                subset[subset_size++] = arr[i];
            }
            i++;
        }
        if (sum == target_sum)
        {
            print_subset(subset, subset_size);
            found = 1;
        }
        subset_mask++;
        free(subset);
    }
    if (!found)
        fprintf(stdout, "\n");
}
int main(int ac, char **av)
{
    if (ac < 3)
    {
        fprintf(stderr, "usage: tagert_sum num1 num2 ... numN\n");
        return (1);
    }
    int target_sum = atoi(av[1]);
    int arr_size = ac - 2;
    int *arr = (int *)malloc(arr_size * sizeof(int));
    if (arr == NULL)
    {
        fprintf(stderr, "malloc failed");
        return (1);
    }
    int i = 0;
    while (i < arr_size)
    {
        arr[i] = atoi(av[i + 2]);
        i++;
    }
    find_subset(arr, arr_size, target_sum);
    free(arr);
    return (0);
}