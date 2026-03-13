package com.expense.tracker.payload.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TransactionRequest {
    private String description;

    @NotNull
    private BigDecimal amount;

    @NotBlank
    private String category;

    @NotBlank
    private String type; // INCOME or EXPENSE

    @NotNull
    private LocalDate date;
}
